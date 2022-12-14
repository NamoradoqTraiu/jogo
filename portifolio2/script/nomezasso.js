//variáveis
var pincel = document.getElementById('canvas').getContext('2d');//variavel para desenho do canvas, mesmo canvas do código html
var screen = document.getElementById('canvas');

var bg=new Bg(0,0,0,0, "fund.png");//imagem de background da classe Bg, herda as funções naquele código
var placar = new Text();//variável texto, usa ela pra escrever e mexer a posição do placar em específico
var Bardo=new Player(-300,520,192,192);//player, herda todas as funções do outro código, aqui se declara a posição inicial, o tamanho e a imagem do player
var Botao=new Tecla(5,0,192,192);//os botões que ficam aparecendo, atualmente não tem imagem, mas pra herdar a imagem é só fazer que nem está no player
var ponto=0;//marca a pontuação atual
var bom = true;//verifica se a pontuação é positiva ou negativa
var incremento=0;//salva o quanto será aumentado/diminuido da pontuação
var timer=75000;
var play=false;//define se o player está vivo e pode prosseguir com o jogo, ou não
var vitoria=false;//define se, ao final do jogo, a tela será de vitória ou de derrota
var som=false;//boolean que controla se o som no fim do jogo tocou uma vez ou não
var clap = new Audio('ogg/clap.ogg');//som de palmas ao fim vitorioso
var musica = new Audio ('ogg/MaisBelaCancao.ogg');//musica
var trombone = new Audio('ogg/trombone.ogg');//som de trombone triste ao fim da derrota
var perdeu=new Text();//variável texto para mexer no fim do jogo, usa isso pra escrever e mexer no texto que aparece na tela de fim de jogo
var palheta=new Object(0,0,300,300,"PALHETA.png")
var cinza1= new Object(0+5,520,192,192, "DISC-P.png");
var cinza2= new Object(250+5,520,192,192, "DISC-P.png");
var cinza3= new Object(250*2+5,520,192,192, "DISC-P.png");
var cinza4= new Object(250*3+5,520,192,192, "DISC-P.png");
var pag= new Pag(0,0,1000,720);
var menu = new Object(0,0,1000,720,"bgm.png");
var telavitoria = new Object (0,0,1000,720,"vi.png");
var teladerrota = new Object (0,0,1000,720,"sad.png"); 
var bgg = true;
var botaoplay = new botao (550,220,250,250,"start.png"); // joia
var replay = new botao (230,430,250,250,"restart.png"); // joia²
var deplay = new botao (200,190,250,250,"restart.png"); // joia³
var rolla = new Pika; //hiper joia
var mousex = 0; 
var mousey = 0; 
var gameove = new Object (10,10,500,500, "gameove.png");

//Player - pressionando tecla
document.addEventListener("keydown",function(event){
    if(event.key==="q"){//se a tecla pressionada for "q"
        Bardo.x=0+5;//coloca o player nesta parte da tela
    }
});
document.addEventListener("keydown",function(event){
    if(event.key==="w"){
        Bardo.x=250+5;
    }
});
document.addEventListener("keydown",function(event){
    if(event.key==="e"){
        Bardo.x=250*2+5;
    }
});
document.addEventListener("keydown",function(event){
    if(event.key==="r"){
        Bardo.x=250*3+5;
    }
});

//Player - Reset.
document.addEventListener("keyup",function(event){
    if(event.key==="q"){//quando a tecla for levantada
        Bardo.x=-300;//retorne o player para fora da tela
    }
});
document.addEventListener("keyup",function(event){
    if(event.key==="w"){
        Bardo.x=-300;
    }
});
document.addEventListener("keyup",function(event){
    if(event.key==="e"){
        Bardo.x=-300;
    }
});
document.addEventListener("keyup",function(event){
    if(event.key==="r"){
        Bardo.x=-300;
    }
});
function linhas(){//desenha umas linhas na tela pra deixar mais bonito, se quiser pode comentar isso daq tudo
    pincel.fillstyle='black';
    pincel.fillRect(250, 0, 5, 900);
    pincel.fillRect(250*2, 0, 5, 900);
    pincel.fillRect(250*3, 0, 5, 900);
    palheta.desenha();//desenha a palheta
    cinza1.desenha();//desenho dos botões
    cinza2.desenha();
    cinza3.desenha();
    cinza4.desenha();
}

function collides(){//colisão
    if(Bardo.collide(Botao)){//se o bardo colidir, ou seja, se o player acertar
    if(rolla.bom==false&&rolla.incremento>10){//e se o player errou a última tecla
        rolla.incremento=2;//reseta o incremento
       }
        musica.play();//toque a música
        rolla.bom=true;//comece um combo de acertos
        rolla.ponto+=rolla.incremento/2;//aumente a pontuação, baseado no incremento dividido por 2
        rolla.incremento++;//aumenta o incremento, para montar um combo
        Botao.acerto();//reseta a posição de um botão após ser acertado
    }
}

function prodigo(){//retorna a tecla caso o Jogador a erre
    if(Botao.y>900){//se a tecla atinge o fim da tela
    musica.pause();//pausa a música
    rolla.bom=false;//começa um combo de erros
    rolla.ponto-=rolla.incremento*2;//diminua a pontuação, baseado no incremento duplicado
    rolla.incremento++;//aumenta o incremento, aumentando em cima do combo de acertos
    Botao.erro();//reseta a posição de um botão, após ser errado
    }
}

//funções importantes

function sound(){//som
    /*if (play){
        //musica.play();
    }else*/ 
    if(botaoplay.play==false){//se o jogo acabou
        musica.pause();//pausa a música
        musica.load();
        if(som==false){//enquanto o som estiver falso
            if (botaoplay.vitoria){//checa se o player ganhou
                clap.play();//e então toca o som de palmas
            }else{//senão
                trombone.play();//toca o som deprimido de trombone
            }
            som=true;//impede do som tocar de novo
        }
    }

} 

function timeout(){//marca o tempo para o jogo fechar sozinho
   if(rolla.timer<=0){//se o timer acabar
    botaoplay.play=false;//o jogo acaba
    
        ganhou();//checa se o player ganhou
    }
    rolla.timer-=10;
}
function ganhou(){
        if(rolla.ponto>=1000){//se a pontuação passa desse valor
            botaoplay.vitoria=true;//player vence
        }else{//senão
            botaoplay.vitoria=false;//player perde
        }
}

function draw(){//atualiza tela

    if (botaoplay.bgg){

        menu.desenha();
        botaoplay.desenha();


    }else{
    if(botaoplay.play){//se o jogo tiver jogando
    bg.desenhaBG();//bota bg lá
    linhas();
    Botao.desenha();//e desenha os botão
    Bardo.animation("fogarel-",12);//mete a animação do fogarel
    Bardo.haurire();
    placar.draw("Pontos: "+rolla.ponto,72,150);//desenha a pontuação nesta posição
    placar.draw("Timer: "+rolla.timer/1000,72,180);//desenha o timer nessa posição
    }else{//senão, o jogo já acabou
        if(botaoplay.vitoria){//ent a gente vê se venceu

                telavitoria.desenha();
                deplay.desenha();
                perdeu.draw("A Sogrinha amou o Bardo.",190,350);//e mete os textos de vitória
                perdeu.draw("Você teve um sucesso crítico!",190,400)
            }else{//ou os de derrot

            teladerrota.desenha();
            replay.desenha();
            gameove.desenha();
            }
        }
    }
}

function update(){//mantém as funções rodando constantemente

    if (botaoplay.bgg){ //  voltei

        function mouse(evento) { //n tem o mouse (variavel)
            botaoplay.mousex = evento.pageX - screen.offsetLeft;
            botaoplay.mousey = evento.pageY - screen.offsetTop; 
         }
         screen.onclick = mouse;
         botaoplay.colide(botaoplay); 

    }else{
    if(botaoplay.play){//se o jogo tiver rodando
    Botao.move();//os botões descem na tela, controla a velocidade deles
    Bardo.timeout();//e o tempo começa a contar
    prodigo();//as função começa a rodar sempre
    collides();

    }else if(botaoplay.vitoria){ // vitoria

        function mouse1(evento) { //n tem o mouse (variavel)
            deplay.mousex = evento.pageX - screen.offsetLeft;
            deplay.mousey = evento.pageY - screen.offsetTop; 
         }
         screen.onclick = mouse1;
         deplay.colide(botaoplay); 

}else{// derrota

    function mouse2(evento) { //n tem o mouse (variavel)
        replay.mousex = evento.pageX - screen.offsetLeft;
        replay.mousey = evento.pageY - screen.offsetTop; 
     }
     screen.onclick = mouse2;
     replay.colide(botaoplay); 

}

}
}

function main(){//todas as informações importantes e funções
    pincel.clearRect(0,0,1000,720);//limpa a tela
    update();//funções acima rodam
    sound();
    draw();
    timeout();
}

Botao.erro();
setInterval(main,10);//dentro de 10 em 10 milissegundos a função main, com todas as funções do código

// pera q to recebendo visita ahh