const mysqlconnection = require('../connections/connection')

module.exports = {

    async updateStudentsNotes(req, res) {
        let student = req.body;

        mysqlconnection.query(`UPDATE historico SET nota_av1 = '${student.grade1}', nota_av2 = '${student.grade2}', freq1 = '${student.freq1}', freq2 = '${student.freq2}' WHERE id_aluno = '${student.id}' AND id_disciplina = '${student.subjectid}'`, (err, rows, fields) => {
            if (!err) {
                res.send(rows)
            } else {
                console.log(err);
            }
        })
    },

    async getStudenstsNotes(req, res) {
        const clas = req.params

        mysqlconnection.query(`SELECT * FROM aluno a JOIN historico h ON a.id = h.id_aluno WHERE a.id_turma = '${clas.classid}' AND h.id_disciplina = '${clas.subjectid}'`, (err, rows, fields) => {
            if (!err) {
                res.send(rows)

            } else {
                console.log(err);
            }
        })
    },

    async createStudent(req, res) {
        let student = req.body

        mysqlconnection.query(`INSERT INTO aluno ( id, id_turma, nome) VALUES (NULL, '${student.class}', '${student.name}')`, (err, rows, fields) => {
            if (!err) {

                student.subjects.forEach(subj => {

                    mysqlconnection.query(`INSERT INTO historico (id, id_disciplina, id_aluno, nota_av1, nota_av2, freq1, freq2) VALUES (NULL, '${student.class}', '${rows.insertId}', '', '', '', '')`, (err, rows, fields) => {
                        if (!err) {
                            // res.send(rows)
            
                        } else {
                            console.log(err);
                        }
                    })
                })



                res.send(rows)

            } else {
                console.log(err);
            }
        })


    },

}