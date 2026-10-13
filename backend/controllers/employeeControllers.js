import {query} from "../utils/connectDB.js";
import {createRowQuery,createEmployeeTableQuery,getAllEmployeeQuery,createEmployeeQuery,getEmployeeQuery,deleteEmployeeQuery,updateEmployeeQuery} from "../utils/sqlQuery.js";

const getAllEmployee = async (req,res,next) => {
    try{
        const response = await query(`select to_regclass('employee_details')`);

        if(!response.rows[0].to_regclass){
            await query(createRowQuery);

            await query(createEmployeeTableQuery);
        }

        const {rows} = await query(getAllEmployeeQuery);
        
        res.json(rows);
        next;
    }catch (error){
        console.log(error.message);
    }
}

const getEmployee = async (req,res,next) => {
    const id = req.params.id;
    const data = await query(getEmployeeQuery, [id]);
    console.log(data);

    if(!data.rows.length){

        return res.json({
            error : "Employee Record not found"
        })

    }

    res.json(data.rows[0]);
    next;
}

const deleteEmployee = async (req,res,next) => {
    const id = req.params.id;

    const data = await query(deleteEmployeeQuery,[id]);

    if(!data.rowCount){
        return res.json({
            error: "Employee Record not found"
        });
    }

    res.json({
        message : "Employee Successfully Deleted"
    });
    next;
}

const updateEmployee = async (req,res,next) => {
    try{
        const id = req.params.id;
        const {name,age,role,salary,email} = req.body;

        const result = await query(updateEmployeeQuery,[name,email,age,role,salary,id]);
        
        if(result.rowCount === 0){
            return res.json({
                error : "Employee Not Updated Successfully"
            });
        }

        res.json(result.rows[0]);
        next;
    }catch(error){
        res.json({
            error : "Error while Updating"
        });
    }
}

const createEmployee = async (req,res,next) => {
    try{
        const {name,age,role,salary,email}= req.body;
        
        if(!name || !role || !age || !salary || !email ){

            return res.json({
                error : "Missing Fields"
            });

        }
        const data = await query(createEmployeeQuery,[name,email,age,role,salary]);
        res.json({
            message : "Employee Created Successfully",
            id : data.rows[0].id
        });

    }catch(error){
        return res.json({
            error : error.message
        });
    }
}

export {getAllEmployee,getEmployee,deleteEmployee,updateEmployee,createEmployee};