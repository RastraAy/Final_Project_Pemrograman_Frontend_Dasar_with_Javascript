function process_argv() {
    const { argv } = process;
    const result = studentPortal(argv[2]);

    return result;
}

function studentPortal(studentId) {
    const studentList = [
        {
            id: "2010310164",
            name: "Rakanda Pangeran Nasution",
            gpa: 2.65,
            status: false,
        },
        {
            id: "2011310021",
            name: "Yosef Noferianus Gea",
            gpa: 3.1,
            status: true,
        },
        {
            id: "2014310100",
            name: "Angelia",
            gpa: 1.25,
            status: true,
        },
        {
            id: "2011320090",
            name: "Dito Bagus Prasetio",
            gpa: 2.75,
            status: true,
        },
        {
            id: "2011320100",
            name: "Hikman Nurahman",
            gpa: 2.45,
            status: true,
        },
        {
            id: "2010320181",
            name: "Edizon",
            gpa: 1.95,
            status: true,
        },
        {
            id: "2012320055",
            name: "Marrisa Stella",
            gpa: 3.5,
            status: false,
        },
        {
            id: "2012330080",
            name: "Dea Christy Keliat",
            gpa: 3,
            status: true,
        },
        {
            id: "2013330049",
            name: "Sekarini Mahyaswari",
            gpa: 3.5,
            status: true,
        },
        {
            id: "2012330004",
            name: "Yerica",
            gpa: 3.15,
            status: false,
        },
    ];

    let result = null;
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].id === studentId) {
        if (!studentList[i].status) {
          result = `Mahasiswa dengan id ${studentId} sudah tidak aktif`;
        } else {
          let credits = getCredits(studentList[i].gpa);
          let availableSubjects = getSubjects(credits);
          result = {
            id: studentId,
            name: studentList[i].name,
            gpa: studentList[i].gpa,
            credits: credits,
            subjects: availableSubjects,
          };
        }
        break;
      }
    }
    if (!result) {
      result = "Mahasiswa tidak terdaftar";
    }
    return result;
}
function getCredits(gpa) {
    const creditLimits = [
        { gpa: 3, credits: 24 },
        { gpa: 2.5, credits: 21 },
        { gpa: 2, credits: 18 },
        { gpa: 1.5, credits: 15 },
        { gpa: 0, credits: 12 }
    ];
    
    let credits = 0;
    for (let i = 0; i < creditLimits.length; i++) {
        if (gpa >= creditLimits[i].gpa) {
            credits = creditLimits[i].credits;
            break;
        }
    }
    
    return credits;
}

function getSubjects(credits) {
    const subjectsList = [
        {
            subjectName: "Ilmu Politik",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Ilmu Ekonomi",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Estetika",
            credit: 1,
            status: "pilihan",
        },
        {
            subjectName: "Kepemimpinan",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Etika",
            credit: 2,
            status: "pilihan",
        },
        {
            subjectName: "Sosiologi",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Teori Pengambil keputusan",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Statistika",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Aplikasi IT",
            credit: 3,
            status: "pilihan",
        },
    ];

    let subjectResult = [];

    const wajib = subjectsList.filter(subject => subject.status === "wajib");
    const pilihan = subjectsList.filter(subject => subject.status === "pilihan");

    pilihan.sort((a, b) => b.credit - a.credit);

    let sortedSubj = [...wajib, ...pilihan];

    for (let i = 0; i < sortedSubj.length; i++) {
        if (credits > 0 && sortedSubj[i].credit <= credits) {
            subjectResult.push(sortedSubj[i]);
            credits -= sortedSubj[i].credit;
        } else {
        break;
        }
    }

return subjectResult;    
}

// Dilarang menghapus/mangganti code dibawah ini!!!
if (process.env.NODE_ENV !== "test") {
    console.log(process_argv());
}

module.exports = {
    studentPortal,
    getSubjects,
    getCredits,
};