const { Worker } = require('worker_threads');

function createWorkers() {
    for (let i = 0; i < 5; i++) {
        const worker = new Worker('./src/worker_threads');
        worker.on('message', (result) => {
            console.log(result);
            
        });

        worker.on('error', (err) => {
            console.log(`Worker error: ${err}`);
            worker.terminate();
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.log(`Worker stopped with exit code ${code}`);
            }
        });

        worker.postMessage({ action: 'start', table: 'users', thread: i, qtd_processos: 10000});
    }
}
/**
 * Teste 
 * Pc no modo G
 * intel i5 - 12500h 16gb ram rxt3050
 * 
 * Banco msql no docker rodando na maquina
 * -----------------------------------
 * 
 * 1 thread - 50.000 +- 2,7612734130166782798 minu
 * 
 * ----------------------------------
 * 2 thread - 25.000 cada thread +- 1,547806646483344872 minu
 * 
 * ---------------------------------
 * 3 thread - +-16.666 cada thread +- 1,1469621634333395654 min
 * 
 * ---------------------------------
 * 4 thread - 12500 cada thread +- 58 segun
 * 
 * ---------------------------------
 * 5 thread - 10000 cada thread +- 52 segun
 * 
 */



createWorkers();