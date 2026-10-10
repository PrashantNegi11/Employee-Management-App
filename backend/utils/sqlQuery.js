export const createRowQuery = `

create type role_type as enum('Developer','Manager','Sales','Admin','Intern')

`;

export const createEmployeeTableQuery = `
    create table employee_details (
    id serial primary key ,
    name varchar(50) not null,
    email varchar(50) not null unique,
    age smallInt not null check(age>18),
    role role_type not null default
    )
`