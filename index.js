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
            return this.amperage * this.voltage * hoursWorked
        }
    }

    info (){
        let powerConsumption = this.powerConsumption()

        if(powerConsumption){
            console.log('Power consumption of "'+this.name+'" is: ' + powerConsumption + ' watts.')
        }
    }
}

class Monitor extends ElectricalAppliance {
    constructor() {
        super('Monitor', 1, 100);
    }
}

class Computer extends ElectricalAppliance {
    constructor(monitor) {
        super('Computer', 2, 500);
        this.monitor = monitor
    }

    powerOn(year, month, date, hours, minutes) {
        super.powerOn(year, month, date, hours, minutes)
        this.monitor.powerOn(year, month, date, hours, minutes)
    }

    powerOff(year, month, date, hours, minutes) {
        super.powerOff(year, month, date, hours, minutes);
        this.monitor.powerOff(year, month, date, hours, minutes)
    }

    powerConsumption(){
        let monitorConsumption = this.monitor.powerConsumption()

        return super.powerConsumption() + monitorConsumption
    }

    info(){
        this.monitor.info()
        super.info()

        console.log('Total power consumption of "'+this.name+'" and "'+this.monitor.name+'" is: ' + this.powerConsumption() + ' watts.')
    }
}

class Refrigerator extends ElectricalAppliance {
    constructor(height, width, depth) {
        super('Refrigerator', 2, 1000);
        this.height = height
        this.width = width
        this.depth = depth
    }

    hoursWorked() {
        return 24
    }
}

const monitor = new Monitor()

const computer = new Computer(monitor)

computer.powerOn(2023, 1, 18, 12, 0)
computer.powerOff(2023, 1, 18, 22, 0)

computer.info()

const refrigerator = new Refrigerator()

refrigerator.info()