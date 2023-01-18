class ElectricalAppliance {
    constructor(name, amperage, voltage) {
        this.name = name
        this.amperage = amperage
        this.voltage = voltage
        this.startTime = undefined
        this.endTime = undefined
    }

    hoursWorked() {
        if(this.startTime === undefined) {
           console.log('Error: Appliance was not powered on yet!')
        }else if(this.endTime === undefined){
           console.log('Error: Appliance was not powered off yet!')
        }else {
            return Math.round(Math.abs(this.endTime - this.startTime) / (1000 * 60 * 60));
        }
    }

    powerOn(year, month, date, hours, minutes){
        this.startTime = new Date(year, month, date, hours, minutes)
    }

    powerOff(year, month, date, hours, minutes) {
        this.endTime = new Date(year, month, date, hours, minutes, 0, 0)
    }

    powerConsumption(){
        let hoursWorked = this.hoursWorked()
        if(hoursWorked){
            let powerConsumption = this.amperage * this.voltage * hoursWorked
            console.log('Power consumption of "'+this.name+'" is: ' + powerConsumption + ' watts.')
        }
    }
}

class Computer extends ElectricalAppliance {
    constructor() {
        super('Computer', 2, 500);
    }
}

class Refrigerator extends ElectricalAppliance {
    constructor() {
        super('Refrigerator', 2, 1000);
    }

    hoursWorked() {
        return 24
    }
}

const computer = new Computer();

computer.powerOn(2023, 1, 18, 12, 0);
computer.powerOff(2023, 1, 18, 22, 0);

computer.powerConsumption()

const refrigerator = new Refrigerator()

refrigerator.powerConsumption()