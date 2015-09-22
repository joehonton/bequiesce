//=============================================================================
//
// File:         src/jot.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 15, 2015
// Contents:     Formatted output to stdout
//
//=============================================================================

import FilenameResolver from "./filename-resolver.class";

export default class Jot {
	
    constructor() {    	
    	Object.seal(this);
    }

    //> if the first argument has the {packageNumber, lineNumber}
    //  interface use it to prefix the message with the filename and linenumber
    trace(obj, message) {
    	if (message == undefined) message = '';

    	if (obj.hasOwnProperty('packageNumber') && obj.hasOwnProperty('lineNumber')) {
    		
    		var lineNumber = Jot.rightJustify( obj.lineNumber.toString(), 4);
    		var filename = FilenameResolver.packageStem(obj.packageNumber);
    		this.stdout(`[${filename} ${lineNumber}] ${message}`);
    	}
    	else
    		this.stdout(obj.toString());
    }
    
    //^ Send message to stdout
    stdout(s) {
    	process.stdout.write(`${s}\n`);
    }
    
    
    //^ Right justify the given string, padding with spaces.
    //> sIn is the string to pad
    //> fixedLen is the desired length
    //> clip anything longer than the fixed length
    static rightJustify(sIn, fixedLen, clip) {
    	if (clip == undefined) clip = true;

    	log.expect(sIn, 'String');
    	log.expect(fixedLen, 'Number');
    	log.expect(clip, 'Boolean');
    	
    	if (clip == true)
    		sIn = sIn.substr(0, fixedLen);
    	
    	if (sIn.length >= fixedLen)
    		return sIn;
    	else
    		return "                               ".substr(0, fixedLen - sIn.length) + sIn;		// s/b " ".repeat(...)
    }
}