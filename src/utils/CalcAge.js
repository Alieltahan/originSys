/**
 * @param {String} birthday DOB in String
 * @returns Number as age.
 */
export function calculateAge(birthday) {
	// birthday is a date
	var ageDifMs = Date.now() - new Date(birthday).getTime();
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}
