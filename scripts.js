const postalCodeRegex = {
  "United States of America": "\\d{5}(-\\d{4})?",  // 12345 or 12345-6789
  "Canada": "[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d",  // K1A 0B1
  "United Kingdom": "([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z]{1,2}[0-9]{1,2})|(([A-Za-z]{1,2}[0-9][A-Za-z])|([A-Za-z]{1,2}[0-9]{1,2}[A-Za-z])))[ ]?[0-9][A-Za-z]{2})",
  "Germany": "\\d{5}",  // 12345
  "France": "\\d{5}",  // 75008
  "Australia": "\\d{4}",  // 2000
  "Japan": "\\d{3}-\\d{4}",  // 123-4567
  "China": "\\d{6}",  // 100000
  "India": "\\d{6}",  // 110001
  "Brazil": "\\d{5}-\\d{3}",  // 12345-123
  "Russia": "\\d{6}",  // 123456
  "Mexico": "\\d{5}",  // 12345
  "Italy": "\\d{5}",  // 00100
  "Netherlands": "\\d{4} ?[A-Za-z]{2}",  // 1234 AB
  "Spain": "\\d{5}",  // 28013
  "Sweden": "\\d{3} ?\\d{2}",  // 123 45
  "Switzerland": "\\d{4}",  // 3000
  "South Africa": "\\d{4}",  // 8000
  "New Zealand": "\\d{4}",  // 6011
  "Singapore": "\\d{6}",  // 123456
  "South Korea": "\\d{5}",  // 12345
  "Norway": "\\d{4}",  // 0123
  "Finland": "\\d{5}",  // 00100
  "Denmark": "\\d{4}",  // 1234
  "Belgium": "\\d{4}",  // 1000
  "Argentina": "\\d{4}",  // C1000
  "Poland": "\\d{2}-\\d{3}",  // 00-001
  "Portugal": "\\d{4}-\\d{3}",  // 1000-001
  "Turkey": "\\d{5}",  // 06100
  "Saudi Arabia": "\\d{5}",  // 12345
  "United Arab Emirates": "",  // UAE has no formal postal codes
  "Ireland": "[A-Za-z]\\d{2} ?[A-Za-z0-9]{4}",  // Eircode format
  "Israel": "\\d{7}",  // 1234567
  "Malaysia": "\\d{5}",  // 50450
  "Philippines": "\\d{4}",  // 1000
  "Indonesia": "\\d{5}",  // 10110
  "Thailand": "\\d{5}",  // 10110
  "Vietnam": "\\d{5}",  // 10000
};

let mail = document.querySelector('#mail');
let country = document.querySelector('#count');
let post = document.querySelector('#post');
let pass1 = document.querySelector('#pass1');
let pass2 = document.querySelector('#pass2');

country.addEventListener('input', ()=>{
  if(!postalCodeRegex[country.value]){
    if(country.value=='United Arab Emirates'){
      country.setCustomValidity('');
    }
    else if(country.validity.valueMissing){
      country.setCustomValidity('This is a required field');
    }
    else{
      country.setCustomValidity('This country is not supported.');
    }
  }
  else{
    country.setCustomValidity('');
  }
})

post.addEventListener('input',()=>{
  if (country.value) {
    if(postalCodeRegex[country.value]){
      let regulation = new RegExp(postalCodeRegex[country.value],'')

      if (regulation.test(post.value)) {
        post.setCustomValidity('')
      }
      else {
        post.setCustomValidity("This postal code is formatted incorrectly")
      }
    }
    else{
      post.setCustomValidity('The country listed is not supported')
    }
  }
  else{
    post.setCustomValidity("Please make sure that 'Country' input is filled out.")
  }
})

pass1.addEventListener('input',()=>{
  if(pass1.value.length>=10){
    let flag1 = false;
    ["!","@","#","$","%","&","*","?"].forEach((e)=>{
      if(pass1.value.includes(e)){
        flag1=true;
      }
    });

    let flag2 = false;
    ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"].forEach((e)=>{
      if(pass1.value.includes(e)){
        flag2=true;
      }
    });
    
    if(flag1&&flag2){
      pass1.setCustomValidity('')
    }
    else{
      if(!flag1&&!flag2){
        pass1.setCustomValidity('Password must contain special characters and uppercase letters');
      }
      else if(!flag1){
        pass1.setCustomValidity('Password must contain special characters')
      }
      else if(!flag2){
        pass1.setCustomValidity('Password must contain uppercase letters')
      }
      else{
        pass1.setCustomValidity('Something went wrong, please try again')
      }
    }
    
  }
  else{
    pass1.setCustomValidity('Password must be greater than or equal to 10 characters')
  }
});

pass2.addEventListener('input',()=>{
  if(pass1.value==pass2.value){
    pass2.setCustomValidity('')
  }
  else{
    pass2.setCustomValidity("Passwords must match")
  }
})
