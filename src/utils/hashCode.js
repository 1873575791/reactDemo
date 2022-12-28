
export function _objectHashCode(obj,depth) {

	if( obj ) {
		switch( typeof(obj) ) {
			case 'object': {
				let hash = 0;
				for( let k in obj ) {
					let v = obj[k];
					if( v !== undefined ) {
						// ignore pair of undefined value
						let h = (depth << 53);
						let vh = 0;
						if( v !== undefined && v !== null ) {
							if( typeof(v) === 'function' ) {
								vh = hashcodeStr(v);
							} else if( typeof(v) === 'object' ) {
								vh = _objectHashCode(v, depth + 1);
							} else {
								vh = hashcodeStr((''+v));
							}
						}
						h += hashcodeStr((k+':') + vh)
						hash ^= h;
					}
				}
				return hash;
			}
			case 'string':
				return hashcodeStr(obj);
			case 'function':
				return 0; // ignore function
			default:
				return hashcodeStr('' + obj);
		}
	}

	return 0;

}

export function hashcodeStr(str) {
	var hash = 0, i, chr, len;
	if (str.length === 0) return hash;
	for (i = 0, len = str.length; i < len; i++) {
	 chr  = str.charCodeAt(i);
	 hash = ((hash << 5) - hash) + chr;
	 hash |= 0; // Convert to 32bit integer
	}
	return hash;
 }


export function hashCode(obj) {
	if( undefined !== obj ) {
		return _objectHashCode(obj,0).toString(16);
	}
	return '';
}

/**
 * Deep comparison through hash code
 * @param {Object} o1
 * @param {Object} o2
 */

export function objectEquals( obj1, obj2 ) {
	if( obj1 === obj2 ) { return true; }
	// if the other array is a falsy value, return
	if( !obj1 || !obj2 ) { return false; }

	return hashCode( obj1 ) === hashCode(obj2);

}
