# ds_validator 
File contains a simple way to implement validation to your html for 
Some rules I implemented 

    * req: "This is a mandatory field",
    * min: "This field doesn't meet minimum length criteria",
    * max: "This field doesn't meet maximum, length criteria",
    * num: "Please Enter Numeric data", //should contain only numbers
    * vem: 'Please Enter a valid Email',
    * nsl: 'There should not be any special character'

        
 * you can use your custom  other validations  too
 
 Use this in html form like 
 ```
 <form id="myform">
   <!--// <input name="username" type="text" validate="req min:3 max:10 " >-->
    <input name="username" type="text" validate="req max:10" >
    <input name="email" type="email" validate="req vem"  >
    <input name="phonenumber" type="text" validate="req num min:10 max:10" >
</form>
``` 

//just  create a validate attribute and give those rules which will prorities sequntially 
 // call on submit 
 ```javascript
function callValidate(form)
        {
         deeps_validator(form,function(result){
             console.log(result);
         });
        }
 ```
  

// if any error come  you will get JSON Response 
```
{
	"status": 1,
	"response": [{
			"element": {},
			"name": "username",
			"req": "This is a mandatory field"
		},
		{
			"element": {},
			"name": "email",
			"req": "This is a mandatory field"
		}, {
			"element": {},
			"name": "email",
			"vem": "Please Enter a valid Email"
		}, {
			"element": {},
			"name": "phonenumber",
			"req": "This is a mandatory field"
		}, {
			"element": {},
			"name": "phonenumber",
			"min": "This field doesn't meet minimum length criteria"
		}
	]
}
```

