var express = require("express");
var router = express.Router();
const db = require("../lib/db");
var conf = require("../lib/conf");
var temp = require("../lib/temp");

router.use(express.urlencoded({ extended: false }));

var today = "";
var year = "";
var month = "";
var day = "";
db.query(`SELECT now() AS today`, function (error, results) {
    if (error) {
        throw error;
    } else {
        let todayData = results[0].today.split(" ");
        today = todayData[0];
        let arr = todayData[0].split("-");
        year = arr[0];
        month = arr[1];
        day = arr[2];
    }
});

router.get("/", function (req, res, next) {
    let msg = "";
    msg = temp.checkPassword();
    res.send(msg);
});

/* GET home page. */
router.post("/logincheck", function (req, res, next) {
    let userId = req.body.userId;
    let userPassword = req.body.userPassword;
    db.query(`SELECT * FROM user WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length == 0) {
                res.write("<script language='javascript'>alert('Incorrect Id')</script>");
                res.write(
                    "<script language='javascript'>window.location='" + conf.Address + "'</script>"
                );
            } else {
                res.send(`
                <form name="form" action="${conf.Address}login" method="post">
                    <input type="hidden" name="userId" value="${userId}">
                    <input type="hidden" name="userPassword" value="${userPassword}">
                    <input type="hidden" name="userName" value="${results[0].name}">
                </form>
                <script language="javascript">
                    document.form.submit();
                </script>`);
            }
        }
    });
});

router.post("/login", function (req, res, next) {
    const userName = req.body.userName;
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;
    const time = req.body.time;
    let resultHTML = "";
    let info = "";
    let inOut = "";
    let allList = "";
    let sumTime1 = 0;
    let sumTime2 = 0;

    db.query(`SELECT password FROM user WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results[0].password == userPassword) {
                db.query(
                    `SELECT * FROM checktime WHERE userId=? AND date=?`,
                    [userId, today],
                    function (error2, results2) {
                        if (error2) {
                            throw error2;
                        } else {
                            var today = " ";
                            if (results2.length == 0) {
                                today += "기록이 없습니다";
                            } else if (results2.length % 2 == 0) {
                                for (let i = 0; i < results2.length; i += 2) {
                                    let arrOut = results2[i].time.split(" ");
                                    let arrIn = results2[i + 1].time.split(" ");
                                    let timeOut = arrOut[1].split(":");
                                    let timeIn = arrIn[1].split(":");
                                    sumTime1 = Math.floor(
                                        ((timeIn[0] - timeOut[0]) * 3600 +
                                            (timeIn[1] - timeOut[1]) * 60 +
                                            (timeIn[2] - timeOut[2])) /
                                            60
                                    );
                                    today += `
                                            <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                                <td class="px-6 py-4 text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                        ${results2[i].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        ${results2[i + 1].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                        ${results2[i].reason}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        ${sumTime1}분
                                                    </span>
                                                </td>
                                            </tr>`;
                                }
                                if (time != undefined) {
                                    db.query(`UPDATE user SET time=? WHERE id=?`, [
                                        Number(time) + sumTime1,
                                        userId,
                                    ]);
                                }
                            } else {
                                for (let i = 0; i < results2.length - 1; i += 2) {
                                    let arrOut = results2[i].time.split(" ");
                                    let arrIn = results2[i + 1].time.split(" ");
                                    let timeOut = arrOut[1].split(":");
                                    let timeIn = arrIn[1].split(":");
                                    sumTime2 = Math.floor(
                                        ((timeIn[0] - timeOut[0]) * 3600 +
                                            (timeIn[1] - timeOut[1]) * 60 +
                                            (timeIn[2] - timeOut[2])) /
                                            60
                                    );
                                    today += `
                                            <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                                <td class="px-6 py-4 text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                        ${results2[i].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        ${results2[i + 1].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                        ${results2[i].reason}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        ${sumTime2}분
                                                    </span>
                                                </td>
                                            </tr>`;
                                }
                                today += `
                                        <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                            <td class="px-6 py-4 text-left whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                    ${results2[results2.length - 1].time}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-purple-800 bg-purple-100 rounded-full">
                                                    진행 중
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                    ${results2[results2.length - 1].reason}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        진행 중
                                                    </span>
                                                </td>
                                        </tr>`;
                            }
                            info += temp.info(userName, today, "");

                            db.query(
                                `SELECT inClass FROM user WHERE id=?`,
                                [userId],
                                function (error3, resulut3) {
                                    if (error3) {
                                        throw error3;
                                    } else {
                                        // 밖에서 들어오는 경우
                                        if (resulut3[0].inClass == 0) {
                                            inOut += temp.in(userId, userPassword, userName);
                                        }
                                        // 안에서 나가는 경우
                                        else {
                                            inOut += temp.out(userId, userPassword, userName);
                                        }

                                        db.query(`SELECT * FROM user`, function (error4, result4) {
                                            let allPeople = "";
                                            for (let i = 0; i < result4.length; i++) {
                                                if (result4[i].inClass == 0) {
                                                    allPeople += `
                                                                <div
                                                                    class="shadow-lg inline-block font-semibold leading-5 text-red-800 bg-red-100 rounded-full mr-2 mb-2 py-0 px-3 text-xs font-semibold h-5">
                                                                    ${result4[i].name} (${result4[i].count}) (${result4[i].lastReason})
                                                                </div>
                                                            `;
                                                }
                                            }
                                            for (let i = 0; i < result4.length; i++) {
                                                if (result4[i].inClass == 1) {
                                                    allPeople += `
                                                                <div
                                                                    class="shadow-lg inline-block font-semibold leading-5 text-green-800 bg-green-100 rounded-full mr-2 mb-2 py-0 px-3 text-xs font-semibold h-5">
                                                                    ${result4[i].name} (${result4[i].count})
                                                                </div>
                                                            `;
                                                }
                                            }
                                            allPeople += `<div class="mb-40"></div>`;
                                            allList = temp.allList(allPeople);
                                            resultHTML = temp.main(info, inOut, allList, "");
                                            res.send(resultHTML);
                                        }); // result4 query문 종료
                                    }
                                } // result3 fucntion 종료
                            ); // result3 query문 종료
                        }
                    } // result2 function 종료
                ); // result2 query문 종료
            } else {
                res.write("<script language='javascript'>alert('Incorrect Password')</script>");
                res.write(
                    "<script language='javascript'>window.location='" + conf.Address + "'</script>"
                );
            }
        }
    });
});

router.post("/enter", function (req, res, next) {
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;
    const userName = req.body.userName;

    db.query(`SELECT time FROM user WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            db.query(`UPDATE user SET inClass=1 WHERE id=?`, [userId], function (error2, results2) {
                if (error2) {
                    throw error2;
                } else {
                    db.query(
                        `INSERT INTO checktime(userId, time, reason, date) VALUES(?, now(), "", ?)`,
                        [userId, today],
                        function (error3, result3) {
                            if (error3) {
                                throw error3;
                            } else {
                                res.send(`
                                <form name="form" action="${conf.Address}login" method="post">
                                    <input type="hidden" name="userId" value="${userId}">
                                    <input type="hidden" name="userPassword" value="${userPassword}">
                                    <input type="hidden" name="userName" value="${userName}">
                                    <input type="hidden" name="time" value="${results[0].time}">
                                </form>
                                <script language="javascript">
                                    document.form.submit();
                                </script>`);
                            }
                        }
                    );
                }
            });
        }
    });
});

router.post("/leave", function (req, res, next) {
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;
    const userName = req.body.userName;
    const reason = req.body.reason;

    db.query(`UPDATE user SET inClass=0 WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            db.query(
                `INSERT INTO checktime(userId, time, reason, date) VALUES(?, now(), ?, ?)`,
                [userId, reason, today],
                function (error2, result2) {
                    if (error2) {
                        throw error2;
                    } else {
                        db.query(
                            `UPDATE user SET count = count + 1 WHERE id=?`,
                            [userId],
                            function (error2, results2) {
                                if (error2) {
                                    throw error2;
                                } else {
                                    db.query(
                                        `UPDATE user SET lastReason = ? WHERE id=?`,
                                        [reason, userId],
                                        function (error3, result3) {
                                            if (error3) {
                                                throw error3;
                                            } else {
                                                res.send(`
                                                <form name="form" action="${conf.Address}login" method="post">
                                                    <input type="hidden" name="userId" value="${userId}">
                                                    <input type="hidden" name="userPassword" value="${userPassword}">
                                                    <input type="hidden" name="userName" value="${userName}">
                                                </form>
                                                <script language="javascript">
                                                    document.form.submit();
                                                </script>`);
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        }
    });
});

router.post("/pro", function (req, res, next) {
    let userPassword = req.body.userPassword;
    if (userPassword == conf.professor) {
        res.redirect(`${conf.Address}pro/${today}`);
    } else {
        res.write("<script language='javascript'>alert('Incorrect Password')</script>");
        res.write("<script language='javascript'>window.location='" + conf.Address + "'</script>");
    }
});

router.get("/pro/:date", function (req, res, next) {
    let resultHTML = "";
    let allList = "";
    let chart = "";
    let rank = "";

    let monthlyArrRecord = [];
    let nameArrRecord = [];
    let monthlyArrTime = [];
    let nameArrTime = [];

    db.query(`SELECT * FROM user`, function (error, result) {
        if (error) {
            throw error;
        } else {
            let allPeople = "";
            for (let i = 0; i < result.length; i++) {
                if (result[i].inClass == 0) {
                    allPeople += `
                    <form action="${conf.Address}checkInfo" method="post" class="inline-block">
                        <input type="hidden" name="userId" value="${result[i].id}">
                        <input type="hidden" name="userPassword" value="${result[i].password}">
                        <input type="hidden" name="userName" value="${result[i].name}">
                        <input class="shadow-lg inline-block font-semibold leading-5 text-red-800 bg-red-100 rounded-full mr-2 mb-2 py-0 px-3 text-xs font-semibold h-5" type="submit" value="${result[i].name} (${result[i].count}) (${result[i].lastReason})">
                    </form>
                `;
                }
            }
            for (let i = 0; i < result.length; i++) {
                if (result[i].inClass == 1) {
                    allPeople += `
                    <form action="${conf.Address}checkInfo" method="post" class="inline-block">
                        <input type="hidden" name="userId" value="${result[i].id}">
                        <input type="hidden" name="userPassword" value="${result[i].password}">
                        <input type="hidden" name="userName" value="${result[i].name}">
                        <input class="shadow-lg inline-block font-semibold leading-5 text-green-800 bg-green-100 rounded-full mr-2 mb-2 py-0 px-3 text-xs font-semibold h-5" type="submit" value="${result[i].name} (${result[i].count})">
                    </form>
                `;
                }
            }
            allList = temp.allList(allPeople);
            db.query(
                `SELECT * FROM user LEFT JOIN countrecord ON user.id = countrecord.userId WHERE countrecord.date=?`,
                [req.params.date],
                function (error2, results2) {
                    if (error2) {
                        throw error2;
                    } else {
                        if (req.params.date == today) {
                            let myChart =
                                "<script>let myChart = document.getElementById('myChart').getContext('2d');";
                            myChart += "let dataChart = new Chart(myChart, {";
                            myChart += "type: 'line',";
                            myChart += "data: {";
                            myChart += "labels: [";
                            for (let i = 0; i < result.length; i++) {
                                if (i == result.length - 1) {
                                    myChart += "'" + result[i].name + "'],";
                                    break;
                                }
                                myChart += "'" + result[i].name + "', ";
                            }
                            myChart += "datasets: [{";
                            myChart += "label: '외출 횟수',";
                            myChart += "data: [";
                            for (let i = 0; i < result.length; i++) {
                                if (i == result.length - 1) {
                                    myChart += result[i].count + "]";
                                    break;
                                }
                                myChart += result[i].count + ", ";
                            }
                            myChart += ",backgroundColor:['rgba(255, 255, 237)']";
                            myChart += "}]";
                            myChart += "}});</script>";
                            let title = req.params.date + " 부재 현황 그래프";
                            chart = temp.chart(title, myChart);
                        } else if (results2.length == 0) {
                            chart = temp.chart("데이터가 존재하지 않습니다", "");
                        } else {
                            let myChart =
                                "<script>let myChart = document.getElementById('myChart').getContext('2d');";
                            myChart += "let dataChart = new Chart(myChart, {";
                            myChart += "type: 'line',";
                            myChart += "data: {";
                            myChart += "labels: [";
                            for (let i = 0; i < results2.length; i++) {
                                if (i == results2.length - 1) {
                                    myChart += "'" + results2[i].name + "'],";
                                    break;
                                }
                                myChart += "'" + results2[i].name + "', ";
                            }
                            myChart += "datasets: [{";
                            myChart += "label: '외출 횟수',";
                            myChart += "data: [";
                            for (let i = 0; i < results2.length; i++) {
                                if (i == results2.length - 1) {
                                    myChart += results2[i].countRecord + "]";
                                    break;
                                }
                                myChart += results2[i].countRecord + ", ";
                            }
                            myChart += ",backgroundColor:['rgba(255, 255, 237)']";
                            myChart += "}]";
                            myChart += "}});</script>";
                            let title = req.params.date + " 부재 현황 그래프";
                            chart = temp.chart(title, myChart);
                        }
                        db.query(
                            "SELECT * FROM countrecord WHERE month=?",
                            [month],
                            function (error3, results3) {
                                if (error3) {
                                    throw error3;
                                } else {
                                    db.query(`SELECT * FROM user`, function (error4, results4) {
                                        if (error4) {
                                            throw error4;
                                        } else {
                                            let day = results3.length / results4.length;
                                            for (let i = 0; i < results4.length; i++) {
                                                nameArrRecord[i] = results4[i].name;
                                                monthlyArrRecord[i] = 0;
                                                nameArrTime[i] = results4[i].name;
                                                monthlyArrTime[i] = 0;
                                            }

                                            let cntRecord = 0;
                                            for (let i = 1; i <= day; i++) {
                                                for (let j = 1; j <= results4.length; j++) {
                                                    monthlyArrRecord[j - 1] +=
                                                        results3[cntRecord++].countRecord;
                                                }
                                            }

                                            let cntTime = 0;
                                            for (let i = 1; i <= day; i++) {
                                                for (let j = 1; j <= results4.length; j++) {
                                                    monthlyArrTime[j - 1] +=
                                                        results3[cntTime++].countTime;
                                                }
                                            }

                                            let tempRecord1;
                                            let tempRecord2;
                                            for (let i = 0; i < nameArrRecord.length - 1; i++) {
                                                for (let j = i + 1; j < nameArrRecord.length; j++) {
                                                    if (monthlyArrRecord[i] < monthlyArrRecord[j]) {
                                                        tempRecord1 = monthlyArrRecord[i];
                                                        monthlyArrRecord[i] = monthlyArrRecord[j];
                                                        monthlyArrRecord[j] = tempRecord1;
                                                        tempRecord2 = nameArrRecord[i];
                                                        nameArrRecord[i] = nameArrRecord[j];
                                                        nameArrRecord[j] = tempRecord2;
                                                    }
                                                }
                                            }

                                            let tempTime1;
                                            let tempTime2;
                                            for (let i = 0; i < nameArrTime.length - 1; i++) {
                                                for (let j = i + 1; j < nameArrTime.length; j++) {
                                                    if (monthlyArrTime[i] < monthlyArrTime[j]) {
                                                        tempTime1 = monthlyArrTime[i];
                                                        monthlyArrTime[i] = monthlyArrTime[j];
                                                        monthlyArrTime[j] = tempTime1;
                                                        tempTime2 = nameArrTime[i];
                                                        nameArrTime[i] = nameArr[j];
                                                        nameArrTime[j] = tempTime2;
                                                    }
                                                }
                                            }

                                            let rankMsgRecord = "";
                                            let rankMsgTime = "";
                                            let rankMark = [
                                                "&#129351",
                                                "&#129352",
                                                "&#129353",
                                                "",
                                                "",
                                            ];
                                            for (let i = 0; i < 5; i++) {
                                                rankMsgRecord += `
                                                    <div class="mt-2">
                                                        <table class="w-full">
                                                            <tr>
                                                                <td class="w-4/12 text-right font-black text-sm text-blue-700">${
                                                                    rankMark[i]
                                                                } ${i + 1}등</td>
                                                                <td class="w-4/12 text-center font-black text-sm">${
                                                                    nameArrRecord[i]
                                                                } 학생</td>
                                                                <td class="w-4/12 text-left font-black text-sm text-red-500 text-sm">${
                                                                    monthlyArrRecord[i]
                                                                }번</td>
                                                            <tr>
                                                        </table>
                                                    </div>
                                                `;
                                                rankMsgTime += `
                                                    <div class="mt-2">
                                                        <table class="w-full">
                                                            <tr>
                                                                <td class="w-4/12 text-right font-black text-sm text-blue-700">${
                                                                    rankMark[i]
                                                                } ${i + 1}등</td>
                                                                <td class="w-4/12 text-center font-black text-sm">${
                                                                    nameArrTime[i]
                                                                } 학생</td>
                                                                <td class="w-4/12 text-left font-black text-sm text-red-500">${
                                                                    monthlyArrTime[i]
                                                                }분</td>
                                                            <tr>
                                                        </table>
                                                    </div>
                                                `;
                                            }
                                            rank = temp.rank(rankMsgRecord, rankMsgTime, month);
                                            resultHTML = temp.main(rank, "", allList, chart);
                                            res.send(resultHTML);
                                        }
                                    });
                                }
                            }
                        );
                    }
                }
            );
        }
    });
});

router.post("/checkInfo", function (req, res, next) {
    const userName = req.body.userName;
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;
    let resultHTML = "";
    let info = "";

    db.query(`SELECT password FROM user WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results[0].password == userPassword) {
                db.query(
                    `SELECT * FROM checktime WHERE userId=? AND date=?`,
                    [userId, today],
                    function (error2, results2) {
                        if (error2) {
                            throw error2;
                        } else {
                            var todayData = " ";
                            if (results2.length == 0) {
                                todayData += `
                                    <div class="m-3">
                                        <h1 class="font-xl text-red-500 font-black">기록이 없습니다</h1>
                                    </div>
                                `;
                            } else if (results2.length % 2 == 0) {
                                for (let i = 0; i < results2.length; i += 2) {
                                    let arrOut = results2[i].time.split(" ");
                                    let arrIn = results2[i + 1].time.split(" ");
                                    let timeOut = arrOut[1].split(":");
                                    let timeIn = arrIn[1].split(":");
                                    let result = (
                                        ((timeIn[0] - timeOut[0]) * 3600 +
                                            (timeIn[1] - timeOut[1]) * 60 +
                                            (timeIn[2] - timeOut[2])) /
                                        60
                                    ).toFixed(1);
                                    todayData += `
                                            <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                                <td class="px-6 py-4 text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                        ${results2[i].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        ${results2[i + 1].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                        ${results2[i].reason}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        ${result}분
                                                    </span>
                                                </td>
                                            </tr>`;
                                }
                            } else {
                                for (let i = 0; i < results2.length - 1; i += 2) {
                                    let arrOut = results2[i].time.split(" ");
                                    let arrIn = results2[i + 1].time.split(" ");
                                    let timeOut = arrOut[1].split(":");
                                    let timeIn = arrIn[1].split(":");
                                    let result = (
                                        ((timeIn[0] - timeOut[0]) * 3600 +
                                            (timeIn[1] - timeOut[1]) * 60 +
                                            (timeIn[2] - timeOut[2])) /
                                        60
                                    ).toFixed(1);
                                    todayData += `
                                            <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                                <td class="px-6 py-4 text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                        ${results2[i].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        ${results2[i + 1].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                        ${results2[i].reason}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        ${result}분
                                                    </span>
                                                </td>
                                            </tr>`;
                                }
                                todayData += `
                                        <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                            <td class="px-6 py-4 text-left whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                    ${results2[results2.length - 1].time}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-purple-800 bg-purple-100 rounded-full">
                                                    진행 중
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                    ${results2[results2.length - 1].reason}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        진행 중
                                                    </span>
                                                </td>
                                        </tr>`;
                            }
                            pro = `
                                <div class="w-full text-center mt-5">
                                <button class="bg-red-600 text-white w-2/12 p-1 shadow-lg rounded-xl font-bold" onClick="location.href='${conf.Address}pro/${today}'">목록으로</button>
                                <div>
                            `;
                            info += temp.info(userName, todayData, pro);
                            resultHTML = temp.main(info, "", "", "");
                            res.send(resultHTML);
                        }
                    } // result2 function 종료
                ); // result2 query문 종료
            }
        }
    });
});

router.post("/resetData", function (req, res, next) {
    let date = req.body.date;
    let userPassword = req.body.userPassword;
    let arr = date.split("-");

    if (userPassword == conf.reset) {
        db.query(`SELECT * FROM user`, function (error, results) {
            for (let i = 0; i < results.length; i++) {
                db.query(
                    `INSERT INTO countrecord(userId, countRecord, countTime, date, year, month, day) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [results[i].id, results[i].count, results[i].time, date, arr[0], arr[1], arr[2]]
                );
            }
            db.query(
                `UPDATE user SET count=0, inClass=1, lastReason="", time=0`,
                function (error2, results2) {
                    if (error2) {
                        throw error2;
                    } else {
                        res.write(
                            "<script language='javascript'>alert('Setup successful')</script>"
                        );
                        res.write(
                            "<script language='javascript'>window.location='" +
                                conf.Address +
                                "'</script>"
                        );
                    }
                }
            );
        });
    } else {
        res.write("<script language='javascript'>alert('Don't click this button')</script>");
        res.write("<script language='javascript'>window.location='" + conf.Address + "'</script>");
    }
});

router.post("/changeDate", function (req, res, next) {
    res.redirect(`${conf.Address}pro/${req.body.date}`);
});

module.exports = router;
