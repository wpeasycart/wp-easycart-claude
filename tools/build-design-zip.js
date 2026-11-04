#!/usr/bin/env node
/* Builds dist/wp-easycart-store-design.zip, the design skill for ChatGPT projects, Gemini Gems and Claude's skill upload, from
   the plugin's design-store skill and zip/design-store/. The same sources make the same zip ( fixed file dates ).
     node tools/build-design-zip.js           build, and print what it holds
     node tools/build-design-zip.js --check   only check the sources ( exit 1 on a problem ) */
'use strict';
const fs = require( 'fs' );
const path = require( 'path' );
const zlib = require( 'zlib' );

const ROOT = path.resolve( __dirname, '..' );
const NAME = 'wp-easycart-store-design';
const SKILL = path.join( ROOT, 'plugins', 'wp-easycart', 'skills', 'design-store' );
const EXTRA = path.join( ROOT, 'zip', 'design-store' );
const OUT = path.join( ROOT, 'dist', NAME + '.zip' );
const INSTRUCTIONS_MAX = 8000; /* ChatGPT project instructions and Gemini Gem instructions both take about this much */

function read( file ) {
	return fs.readFileSync( file, 'utf8' ).replace( /\r\n/g, '\n' );
}
function files() {
	const skill = read( path.join( SKILL, 'SKILL.md' ) ).replace( /^name: design-store$/m, 'name: ' + NAME );
	return [
		[ 'SKILL.md', skill ],
		[ 'references/change-format.md', read( path.join( SKILL, 'references', 'change-format.md' ) ) ],
		[ 'INSTRUCTIONS.md', read( path.join( EXTRA, 'INSTRUCTIONS.md' ) ) ],
		[ 'README.md', read( path.join( EXTRA, 'README.md' ) ) ],
	];
}
function problems( list ) {
	const out = [];
	const skill = list.find( ( f ) => 'SKILL.md' === f[ 0 ] )[ 1 ];
	const front = skill.match( /^---\n([\s\S]*?)\n---\n/ );
	const name = front && front[ 1 ].match( /^name: (.+)$/m );
	const desc = front && front[ 1 ].match( /^description: (.+)$/m );
	if ( ! name || name[ 1 ] !== NAME ) {
		out.push( 'SKILL.md: the name is not ' + NAME );
	}
	if ( name && ! /^[a-z0-9-]{1,64}$/.test( name[ 1 ] ) ) {
		out.push( 'SKILL.md: a skill name is lower case letters, digits and hyphens, at most 64' );
	}
	if ( ! desc || desc[ 1 ].length > 1024 ) {
		out.push( 'SKILL.md: a description of at most 1024 characters' );
	}
	const instructions = list.find( ( f ) => 'INSTRUCTIONS.md' === f[ 0 ] )[ 1 ];
	if ( instructions.length > INSTRUCTIONS_MAX ) {
		out.push( 'INSTRUCTIONS.md: ' + instructions.length + ' characters, more than ' + INSTRUCTIONS_MAX );
	}
	for ( const [ file, text ] of list ) {
		if ( /\bTODO\b|\bXXX\b/.test( text ) ) {
			out.push( file + ': a TODO left in' );
		}
	}
	return out;
}
function zip( list ) {
	const time = ( 0 << 11 ) | ( 0 << 5 ); /* 00:00 */
	const date = ( ( 2026 - 1980 ) << 9 ) | ( 11 << 5 ) | 1; /* 2026-11-01 */
	const local = [];
	const central = [];
	let offset = 0;
	for ( const [ file, text ] of list ) {
		const name = Buffer.from( NAME + '/' + file, 'utf8' );
		const data = Buffer.from( text, 'utf8' );
		const packed = zlib.deflateRawSync( data, { level: 9 } );
		const crc = zlib.crc32( data );
		const head = Buffer.alloc( 30 );
		head.writeUInt32LE( 0x04034b50, 0 );
		head.writeUInt16LE( 20, 4 );
		head.writeUInt16LE( 0x0800, 6 ); /* names in UTF-8 */
		head.writeUInt16LE( 8, 8 );
		head.writeUInt16LE( time, 10 );
		head.writeUInt16LE( date, 12 );
		head.writeUInt32LE( crc, 14 );
		head.writeUInt32LE( packed.length, 18 );
		head.writeUInt32LE( data.length, 22 );
		head.writeUInt16LE( name.length, 26 );
		head.writeUInt16LE( 0, 28 );
		local.push( head, name, packed );
		const entry = Buffer.alloc( 46 );
		entry.writeUInt32LE( 0x02014b50, 0 );
		entry.writeUInt16LE( 20, 4 );
		entry.writeUInt16LE( 20, 6 );
		entry.writeUInt16LE( 0x0800, 8 );
		entry.writeUInt16LE( 8, 10 );
		entry.writeUInt16LE( time, 12 );
		entry.writeUInt16LE( date, 14 );
		entry.writeUInt32LE( crc, 16 );
		entry.writeUInt32LE( packed.length, 20 );
		entry.writeUInt32LE( data.length, 24 );
		entry.writeUInt16LE( name.length, 28 );
		entry.writeUInt32LE( offset, 42 );
		central.push( entry, name );
		offset += head.length + name.length + packed.length;
	}
	const dir = Buffer.concat( central );
	const end = Buffer.alloc( 22 );
	end.writeUInt32LE( 0x06054b50, 0 );
	end.writeUInt16LE( list.length, 8 );
	end.writeUInt16LE( list.length, 10 );
	end.writeUInt32LE( dir.length, 12 );
	end.writeUInt32LE( offset, 16 );
	return Buffer.concat( [ ...local, dir, end ] );
}

const list = files();
const bad = problems( list );
if ( bad.length ) {
	console.error( bad.join( '\n' ) );
	process.exit( 1 );
}
if ( process.argv.includes( '--check' ) ) {
	console.log( 'The sources are fine ( ' + list.length + ' files ).' );
	process.exit( 0 );
}
fs.mkdirSync( path.dirname( OUT ), { recursive: true } );
const bytes = zip( list );
fs.writeFileSync( OUT, bytes );
console.log( path.relative( ROOT, OUT ) + ': ' + bytes.length + ' bytes' );
for ( const [ file, text ] of list ) {
	console.log( '  ' + NAME + '/' + file + ' ( ' + Buffer.byteLength( text ) + ' bytes )' );
}
