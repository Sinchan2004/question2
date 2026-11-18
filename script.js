function getUniversitySummary(students) {

    let summary = {};

    // Go through each student
    for (let i = 0; i < students.length; i++) {

        let student = students[i];
        let university = student.university;
        let score = student.score;

        // Check if university already exists
        if (summary[university] === undefined) {

            summary[university] = {
                totalStudents: 0,
                totalScore: 0,
                highestScore: score
            };
        }

        // Count students
        summary[university].totalStudents++;

        // Add student score
        summary[university].totalScore += score;

        // Find highest score
        if (score > summary[university].highestScore) {
            summary[university].highestScore = score;
        }
    }

    // Calculate average score
    for (let university in summary) {

        let average = summary[university].totalScore /
                      summary[university].totalStudents;

        summary[university].averageScore = Number(average.toFixed(2));

        delete summary[university].totalScore;
    }

    return summary;
}


// Process button click
document.getElementById("processButton").addEventListener("click", function () {

    let input = document.getElementById("studentData").value;

    let result = document.getElementById("result");
    let error = document.getElementById("error");

    try {

        let students = JSON.parse(input);

        let universitySummary = getUniversitySummary(students);

        result.textContent = JSON.stringify(universitySummary, null, 2);

        error.textContent = "";

    } catch (e) {

        error.textContent = "Please enter valid JSON.";

        result.textContent = "";
    }

});


// Display output when page opens
document.getElementById("processButton").click();