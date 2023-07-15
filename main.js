const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldObject) {
        this.fieldObject = fieldObject
        this.fieldString = ''
        this.coordanates = [0,0]
        this.status = 'which way?'
    }

    getCoordanates(prompt) {

        if(prompt === 'r') {
            this.coordanates[0] += 1
        }
        if (prompt === 'l') {
            this.coordanates[0] -= 1
        }
        if (prompt === 'u') {
            this.coordanates[1] -= 1
        }
        if (prompt === 'd') {
            this.coordanates[1] += 1
        }
    }
    

    showField() {
        this.fieldObject.forEach(row => {
            this.fieldString = this.fieldString.concat(`${row.join("")}\n`)
        })
        
        console.log(this.fieldString)
        if (this.status === 'which way?') {
            const value = prompt(this.status) 
            this.searchPoint(value)
        } else {
            prompt(this.status) 
        }
        
    }

    searchPoint (input) {
    this.getCoordanates(input)

    let actualPoint = ""

    if(this.fieldObject[this.coordanates[1]]) {

        if(this.fieldObject[this.coordanates[1]][this.coordanates[0]]) {

            actualPoint = this.fieldObject[this.coordanates[1]][this.coordanates[0]]
            this.fieldObject[this.coordanates[1]][this.coordanates[0]] = pathCharacter
    
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

    static generateField(rows, column, holePorcentage) {
        
        let newField = []

        for(let i = 0; i < height; i++){
            newField.push(new Array(width).fill(fieldCharacter))
        }

        const totalFieldElements = 0
        newField.forEach(row => {
            totalFieldElements += row.length
        })

        const calculateHolesElements = (100/holePorcentage) * totalFieldElements;
        
        const randomHoleLocation = []

        for (let i = 0; i < calculateHolesElements; i++) {
            const randomNumber = Math.floor(Math.random() * calculateHolesElements) + 1;
            randomHoleLocation.push(randomNumber)
        }

            const fieldRowLength = newField[0].length;
            let fieldInOneArray = newField.flat();

        randomHoleLocation.forEach(element => {
            fieldInOneArray[element] = hole

            for(let i = 0; i < fieldInOneArray; i += fieldRowLength) {
                newField = fieldInOneArray.slice(i, fieldRowLength)
            }
        })

        return newField
    }
}

const field1 = new Field([
    ['*', 'O', 'O', '░', '░', '░'],
    ['░', 'O', '░', '░', 'O','░' ],
    ['░', '^', '░', 'O', '░','░' ],
    ['░', '░', '░', 'O', '░','░' ],
    ['░', '░', '░', 'O', '░','░' ],
  ])

  console.log(field1.showField())

