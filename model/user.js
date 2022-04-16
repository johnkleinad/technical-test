export class User {
    constructor(values) {
        this.id = values.find((value) => value.name == 'id').input.value;
        this.firstName = values.find((value) => value.name == 'firstName').input.value;
        this.secondName = values.find((value) => value.name == 'secondName').input.value;
        this.email = values.find((value) => value.name == 'email').input.value;
        this.familyName = values.find((value) => value.name == 'familyName').input.value;
        this.lastName = values.find((value) => value.name == 'lastFamilyName').input.value;
        this.birthday = values.find((value) => value.name == 'birthday').input.value;
        this.status = values.find((value) => value.name == 'status').input.value;
        this.assignedAnalyst = values.find((value) => value.name == 'assignedAnalyst').input.value;
    }
}