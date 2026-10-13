export const createRowQuery = `

create type role_type as enum('Developer','Manager','Sales','Admin','Intern')

`;

export const createEmployeeTableQuery = `
    create table employee_details (
    id serial primary key ,
    name varchar(50) not null,
    email varchar(50) not null unique,
    age smallInt not null check(age>18),
    role role_type not null default 'Intern',
    salary decimal(8,2) not null
    )
`;

export const getAllEmployeeQuery = 'select * from employee_details ';

export const createEmployeeQuery = `insert into employee_details (name,email,age,role,salary) values ($1,$2,$3,coalesce($4::role_type, 'Intern'::role_type),$5) returning *`;

export const getEmployeeQuery = `select * from employee_details where id = $1 `;

export const deleteEmployeeQuery = `delete from employee_details where id = $1 `;

export const updateEmployeeQuery = `update employee_details set name = coalesce($1,name),email = coalesce($2,email) , age = coalesce($3,age) , role = coalesce($4 :: role_type,role), salary = coalesce($5,salary) where id = $6 returning * `;