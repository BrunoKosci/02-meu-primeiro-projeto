const player1 = {
    nome: 'Mario',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
}

const player2 = {
    nome: 'Peach',
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0,
}

const player3 = {
    nome: 'Yoshi',
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0,
}

const player4 = {
    nome: 'Bowser',
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
}

const player5 = {
    nome: 'Luigi',
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
}

const player6 = {
    nome: 'Donkey Kong',
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
}

//Math.floor =  utilizando para arrendondar um número.
//Math.random = realizar de forma aleatória, nesse caso um dado. 
//async = serve para que espere uma ação, neste caso quando o dado é jogado. (Inverso de "nado sincronizado")
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getExtra() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = -1
            break;

        case random < 0.66:
            result = -2
            break;
        default:
            result = 1
    }
    return result;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    //parecido com if, é uma estrutura condicional(valor booleano)
    switch (true) {
        case random < 0.33:
            result = "Reta";
            break;
        case random < 0.66:
            result = "Curva";
            break;
        default:
            result = "Confronto";
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName}  🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);


        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //rolar os dados.
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "Reta") {
            totalTestSkill1 = diceResult1 + character1.velocidade;
            totalTestSkill2 = diceResult2 + character2.velocidade;


            await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
            await logRollResult(character2.nome, "velocidade", diceResult2, character2.velocidade);
        }
        if (block === "Curva") {
            totalTestSkill1 = diceResult1 + character1.manobrabilidade;
            totalTestSkill2 = diceResult2 + character2.manobrabilidade;

            await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
            await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);
        }
        if (block === "Confronto") {
            let powerResult1 = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;
            let extra = await getExtra();

            console.log(`${character1.nome} confrontou com ${character2.nome}`);

            await logRollResult(character1.nome, "poder", diceResult1, character1.poder);
            await logRollResult(character2.nome, "poder", diceResult2, character2.poder);


            //Deixando o IF de forma mais "legivel", if combinado.

            if (powerResult1 > powerResult2 && character2.pontos > 0) {
                console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto`)
                character2.pontos--;
            }
            if (powerResult2 > powerResult1 && character1.pontos > 0) {
                console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto`)
                character1.pontos--;
            }


            if (extra < 0 && character1.pontos > 1) {
                console.log(`Porém, ${character1.nome} pegou ${extra === -1 ? "um casco" : "uma bomba"} e perdeu ${extra} ponto(s)!`);
                character1.poder += extra;
            } else if (extra > 0) {
                console.log(`Desta vez, ${character1.nome} pegou turbo e ganhoi ${extra} ponto(s)!`);
                character1.pontos += extra;
            }


            //Deixando o código mais "limpo" através do IF Ternário.

            /* character2.pontos -=
                 powerResult1 > powerResult2 && character2.pontos > 0 ? 1 : 0;
 
             character1.pontos -=
                 powerResult2 > powerResult1 && character1.pontos > 0 ? 1 : 0;
 
             console.log(
                 powerResult2 === powerResult1
                     ? "Confronto empatado! Nenhum ponto foi perdido" : ""
             )*/

            //Fazendo if de forma tradicional.

            /*if (powerResult1 > powerResult2) {
                if (character2.pontos > 0) {
                    character2.pontos--;
                }
            }
            if (powerResult2 > powerResult1) {
                if (character1.pontos > 0) {
                    character1.pontos--;
                }
            }
            if (powerResult1 === powerResult2) {
                if (character2.pontos > 0) {
                    console.log("Confronto empatado! Nenhum ponro foi perdido.")
                }
            }*/
        }

        //verificando o vencedor.

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.nome} marcou um ponto!`);
            character1.pontos++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.nome} marcou um ponto!`);
            character2.pontos++;
        }

        console.log("--------------------------------");
    }


}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.nome}: ${character2.pontos} ponto(s)`);
    console.log(`${character2.nome}: ${character1.pontos} ponto(s)`);

    if (character1.pontos > character2.pontos) {
        console.log(`\n${character1.nome} venceu a corrida! Parabéns!🏆`);
    } else if (character2.pontos > character1.pontos) {
        console.log(`\n${character2.nome} venceu a corrida! Parabéns!🏆`);
    } else {
        console.log("A corrida terminou em empate");
    }
}
//Função de entrada. 
//()()Envolvendo em chaves serve para uma função autoinvocavel(Auto Invoke).
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();