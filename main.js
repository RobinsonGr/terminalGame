const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldObject) {
        this.fieldObject = fieldObject
        this.fieldString = ''

        //the X (row) is the first posisiton and Y(column) is the second position
        this.coordanates = [0,0]
        this.status = 'which way?'
    }

    getCoordanates(prompt) {
        if(prompt === 'r') {
            this.coordanates[1] += 1
        }
        if (prompt === 'l') {
            this.coordanates[1] -= 1
        }
        if (prompt === 'u') {
            this.coordanates[0] -= 1
        }
        if (prompt === 'd') {
            this.coordanates[0] += 1
        }
    }
    
    showField() {
        this.fieldObject.forEach(row => {
            this.fieldString = this.fieldString.concat(`${row.join("")}\n`)
        })
        
        if (this.status === 'which way?') {
            console.log(this.fieldString)
            const value = prompt(this.status) 
            this.searchPoint(value)
        } else {
            prompt(this.status) 
        }
    }

    searchPoint (input) {
    this.getCoordanates(input)

    let actualPoint = ""

    if(this.fieldObject[this.coordanates[0]]) {

        if(this.fieldObject[this.coordanates[0]][this.coordanates[1]]) {

            actualPoint = this.fieldObject[this.coordanates[0]][this.coordanates[1]]

            
            this.fieldObject[this.coordanates[0]][this.coordanates[1]] = pathCharacter
    
            if(actualPoint === hole) {
                this.status = 'you fell down'
            }
        
            if(actualPoint === hat) {
                this.status = 'you win'
            }
        } else {
             this.status = 'out of bounds'
        }

    } else {
        this.status = 'out of bounds'
    }
    this.showField()
    }

    static generateField(rows, columns, holePorcentage) {
        
        let newField = []

        function randomIndex(limit = totalFieldElements) {
            /*haha taking advantages of hoising */
            return Math.floor(Math.random() * limit) + 1
        }

        /*it for iteration will be create the array (row) and the
        new Array instance will create the elements of that array (columns), 
        all in one outer array
        */
        for(let i = 0; i < rows; i++){
            newField.push(new Array(columns).fill(fieldCharacter))
        }
    
        newField[0][0] = '*'

        /*It get every array and count his length
        Also it's equivalent to : rows * newField.length .
        
        */
        let totalFieldElements = 0;
        newField.forEach(row => {
            totalFieldElements += row.length
        })

        /* this will give the value of the holes by the porcentage*/
        const calculateHolesElements = (holePorcentage / 100) * totalFieldElements;
        const randomHoleLocation = [];
        
        while (randomHoleLocation.length < calculateHolesElements) {
    
            randomHoleLocation.push(randomIndex());
          
        }

        console.log(randomHoleLocation.length)

        console.log(calculateHolesElements)

        /*I've already the array with the random location,
        the next step is decompose all arrays into one to go to that location
        */
            const fieldRowLength = newField[0].length;
            let fieldInOneArray = newField.flat();


        randomHoleLocation.forEach(element => {
            /*insert the hole in that random position */
            fieldInOneArray[element] = hole
            
        })


        /*Redo the arrays again*/

        newField = []
            for(let i = 0; i < fieldInOneArray.length; i += fieldRowLength) {
                const redoRow = fieldInOneArray.slice(i, i + fieldRowLength)
                newField.push(redoRow)
            }
        
        newField[randomIndex(newField.length - 1)][randomIndex(newField[0].length - 1)] = hat

        return newField
    }
}

const fieldGenerated = Field.generateField(5, 10, 20)

const field1 = new Field(fieldGenerated)


console.log(field1.showField())

