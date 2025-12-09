function parseTime(timeString) {
    if (!timeString) return null;

    const parts = timeString.split(":");
    if (parts.length !== 2) {
        throw new Error("Invalid time format: " + timeString);
    }

    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);

    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("Time contains non-numeric values: " + timeString);
    }

    return hours * 60 + minutes; 
}

function processAttendance(input) {
    
    const data = { ...input };

    let status = "complete";
    let totalWorkingMinutes = 0;
    let overtimeMinutes = 0;
    let errorMessage = null;
    let note = "";

    try {
        
        if (!data.checkIn || !data.checkOut) {
            status = "incomplete";
            note = "Missing check-in or check-out time";
            return {
                employeeId: data.employeeId,
                date: data.date,
                status,
                totalWorkingMinutes: 0,
                overtimeMinutes: 0,
                note,
                errorMessage
            };
        }

        const checkInMinutes = parseTime(data.checkIn);
        const checkOutMinutes = parseTime(data.checkOut);

        
        let breakDuration = 0;

        if (data.breakStart && data.breakEnd) {
            const breakStart = parseTime(data.breakStart);
            const breakEnd = parseTime(data.breakEnd);
            breakDuration = breakEnd - breakStart;
        } else if (data.breakStart && !data.breakEnd) {
            breakDuration = 30; 
            note = "Break end missing — default break applied (30 mins)";
        }

        
        totalWorkingMinutes = (checkOutMinutes - checkInMinutes) - breakDuration;

        if (totalWorkingMinutes < 0) {
            status = "invalid";
            note = "Calculated working time is negative";
            totalWorkingMinutes = 0;
            return {
                employeeId: data.employeeId,
                date: data.date,
                status,
                totalWorkingMinutes,
                overtimeMinutes,
                note,
                errorMessage
            };
        }

        
        if (data.overtimeApproved === true && totalWorkingMinutes > 480) {
            overtimeMinutes = totalWorkingMinutes - 480;
        }

    } catch (err) {
        status = "error";
        errorMessage = err.message;
        totalWorkingMinutes = 0;
        overtimeMinutes = 0;
    } finally {
        console.log("\nAttendance processed successfully.\n");
    }

    return {
        employeeId: data.employeeId,
        date: data.date,
        status,
        totalWorkingMinutes,
        overtimeMinutes,
        note,
        errorMessage
    };
}



const attendanceInput = {
    employeeId: "EMP1024",
    date: "2025-02-18",
    checkIn: "09:00",
    checkOut: "18:30",
    breakStart: "13:00",
    breakEnd: null,          
    overtimeApproved: true
};


const summary = processAttendance(attendanceInput);



console.log("=== Attendance Summary ===");
console.table([summary]);

