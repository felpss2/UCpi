const bcrypt = require('bcrypt');

const password = 'sua_senha_aqui';
const saltRounds = 10; // Número de rounds para salting

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log(`Senha encriptada: ${hash}`);
});



const storedHash = 'hash_armazenado_no_banco_de_dados';

bcrypt.compare(password, storedHash, (err, result) => {
    if (err) throw err;
    if (result) {
        console.log('Senha válida!');
    } else {
        console.log('Senha inválida!');
    }
});