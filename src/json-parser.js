exports.parse = function(resp) {
  var officials = {
    president: "",
    senators: [],
    houserep: "",
    governor: "",
  }

  officials.president = resp.officials[0].name;
  officials.senators.push(resp.officials[1].name), officials.senators.push(resp.officials[2].name);
  officials.houserep = resp.officials[3].name;
  officials.governor = resp.officials[4].name;

  return officials;




}
