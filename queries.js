// 1. Find all the topics and tasks which are thought in the month of October
db.topics.find({ date: { $gte: "2020-10-01", $lte: "2020-10-31" } });
db.tasks.find({ date: { $gte: "2020-10-01", $lte: "2020-10-31" } });

// 2. Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.find({ date: { $gte: "2020-10-15", $lte: "2020-10-31" } });

// 3.Find all the company drives and students who are appeared for the placement.
db.company_drives.find({appeared: true});

db.users.find({appeared_placement: true});


// 4.Find the number of problems solved by the user in codekata
db.codekata.aggregate([
    {$group: {
        _id: 0,
        totals_problems_solved:{
            $sum: "$problems_solved"
        }
    }}
])

// 5.Find all the mentors with who has the mentee's count more than 15
db.mentors.find({ mentee_count: { $gt: 15 } });

// 6. Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.users.aggregate([
    {$lookup:{
        from: "tasks",
        localField: "_id",
        foreignField: "name",
        as: "tasks"
    }},
    {$lookup: {
        from: "attendence",
        localField: "_id",
        foreignField: "name",
        as: "attendence"
    }},
    {$match: {
        $and: [
            {"attendence.date": {$gte: "2020-10-15",$lte: "2020-10-31"}},
            {"attendence.attendence": "A"},
            {"tasks.date": {$gte: "2020-10-15", $lte: "2020-10-31"}},
            {"tasks.submitted": false}
        ]
    }},
    {
        $group: {
            _id: "name",
            count: {
                $sum: 1
            }
        }
    },
    {
        $count: "Total_Users"
    }
])