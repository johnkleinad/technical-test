export class User {
    constructor(values) {
        const { value, status } = values
        this.id = value.find((value) => value.name == 'id').input.value;
        this.firstName = value.find((value) => value.name == 'firstName').input.value;
        this.secondName = value.find((value) => value.name == 'secondName').input.value;
        this.familyName = value.find((value) => value.name == 'familyName').input.value;
        this.lastName = value.find((value) => value.name == 'lastName').input.value;
        this.email = value.find((value) => value.name == 'email').input.value;
        this.birthday = value.find((value) => value.name == 'birthday').input.value;
        this.status = status
        this.assignedAnalyst = value.find((value) => value.name == 'assignedAnalyst').input.value;
        this.cel = value.find((value) => value.name == 'cel').input.value;
    }
}
export class NewUser {
    constructor(values) {
        this.firstName = values.find((value) => value.name == 'nombre').input.value;
        this.secondName = values.find((value) => value.name == 'segundo nombre').input.value;
        this.familyName = values.find((value) => value.name == 'apellido paterno').input.value;
        this.lastName = values.find((value) => value.name == 'apellido materno').input.value;
        this.email = values.find((value) => value.name == 'email').input.value;
        this.birthday = values.find((value) => value.name == 'birthday').input.value;
        this.cel = values.find((value) => value.name == 'telefono').input.value;
        this.assignedAnalyst = values.find((value) => value.name == 'analista asignado').input.value;
    }
}