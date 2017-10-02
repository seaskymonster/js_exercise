1. what is output ?

var Employee = {
	company: 'xyz'
}

var emp1 = Object.create(Employee);
delete emp1.company
console.log(emp1.company)


//answer: xyz
Here, emp1 object has company as its prototype property, the delete operator doesn't delete prototype property

console.log(emp1.hasOwnproperty('company')) // false

Howver, we can delete the company property directly form the Employee Ojbect by using "delete Employee.company"

Or delete emp1.__proto__.company.





