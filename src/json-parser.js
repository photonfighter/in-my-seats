exports.parse = function(resp) {
  var officials = {
    president: {
      name: "",
      party: "",
      phone: "",
      address: {
        addressLineOne: "",
        addressLineTwo: "",
        city: "",
        state: "",
        zip: "",
      }
    },
    senators: {
      senatorOne: {
        name: "",
        party: "",
        phone: "",
        address: {
          addressLineOne: "",
          addressLineTwo: "",
          city: "",
          state: "",
          zip: "",
        }
      },

      senatorTwo: {
        name: "",
        party: "",
        phone: "",
        address: {
          addressLineOne: "",
          addressLineTwo: "",
          city: "",
          state: "",
          zip: "",
        }
      }
    },
    houseRep: {
      name: "",
      party: "",
      phone: "",
      address: {
        addressLineOne: "",
        addressLineTwo: "",
        city: "",
        state: "",
        zip: "",
      }
    },
    governor: {
      name: "",
      party: "",
      phone: "",
      address: {
        addressLineOne: "",
        addressLineTwo: "",
        city: "",
        state: "",
        zip: "",
      }
    }
  }

  officials.president.name = resp.officials[0].name;
  officials.president.party = resp.officials[0].party;
  officials.president.phone = resp.officials[0].phones[0];
  officials.president.address.addressLineOne = resp.officials[0].address[0].line1;
  officials.president.address.addressLineTwo = resp.officials[0].address[0].line2;
  officials.president.address.city = resp.officials[0].address[0].city;
  officials.president.address.zip = resp.officials[0].address[0].zip;

  officials.senators.senatorOne.name = resp.officials[1].name;
  officials.senators.senatorOne.party = resp.officials[1].party;
  officials.senators.senatorOne.phone = resp.officials[1].phones[0];
  officials.senators.senatorOne.address.addressLineOne = resp.officials[1].address[0].line1;
  officials.senators.senatorOne.address.addressLineTwo = resp.officials[1].address[0].line2;
  officials.senators.senatorOne.address.city = resp.officials[1].address[0].city;
  officials.senators.senatorOne.address.zip = resp.officials[1].address[0].zip;

  officials.senators.senatorTwo.name = resp.officials[2].name;
  officials.senators.senatorTwo.party = resp.officials[2].party;
  officials.senators.senatorTwo.phone = resp.officials[2].phones[0];
  officials.senators.senatorTwo.address.addressLineOne = resp.officials[2].address[0].line1;
  officials.senators.senatorTwo.address.addressLineTwo = resp.officials[2].address[0].line2;
  officials.senators.senatorTwo.address.city = resp.officials[2].address[0].city;
  officials.senators.senatorTwo.address.zip = resp.officials[2].address[0].zip;

  officials.houseRep.name = resp.officials[3].name;
  officials.houseRep.party = resp.officials[3].party;
  officials.houseRep.phone = resp.officials[3].phones[0];
  officials.houseRep.address.addressLineOne = resp.officials[3].address[0].line1;
  officials.houseRep.address.addressLineTwo = resp.officials[3].address[0].line2;
  officials.houseRep.address.city = resp.officials[3].address[0].city;
  officials.houseRep.address.zip = resp.officials[3].address[0].zip;

  officials.governor.name = resp.officials[4].name;
  officials.governor.party = resp.officials[4].party;
  officials.governor.phone = resp.officials[4].phones[0];
  officials.governor.address.addressLineOne = resp.officials[4].address[0].line1;
  officials.governor.address.addressLineTwo = resp.officials[4].address[0].line2;
  officials.governor.address.city = resp.officials[4].address[0].city;
  officials.governor.address.zip = resp.officials[4].address[0].zip;




  return officials;




}
