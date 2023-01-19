const { parentPort } = require('worker_threads');
const { connection } = require('../database/config.js');

const now = require('performance-now');


parentPort.on('message', async (msg) => {
    try {
        if (msg.action === 'start') {
            let start = now();
            console.log(`Comecou ${msg.thread}`);
            for (let i = 0; i < msg.qtd_processos; i++) {
                await connection.select().from(msg.table);
                await connection(msg.table).where('id', "1").update({ name: 'new name' });

                await connection.select().from(msg.table);
                await connection(msg.table).where('id', "1").update({ name: 'new name' });

                await connection.select().from(msg.table);
                await connection(msg.table).where('id', "1").update({ name: 'new name' });

                await connection.select().from(msg.table);
                await connection(msg.table).where('id', "1").update({ name: 'new name' });
            }
            let end = now();
            let timeElapsed = end - start;
            console.log(`Tempo de execução da ${msg.thread} - qtd processos ${msg.qtd_processos}: ${timeElapsed} ms`);
            parentPort.close();
        }
        
    } catch (error) {
        console.log(error);
        throw new error
    }
   
});