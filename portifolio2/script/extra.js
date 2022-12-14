class Object{//classe principal, contém tudo que um "objeto" tem no contexto do código
    frame=1;//frames de uma animação
    timer=0;//tempo da animação, conduz a animação, dizendo quando um frame será mudado, veja abaixo na função
    posição=1;//serve pra saber em qual das 4 linhas vai se ter um objeto
    constructor(x,y,width,height,color){//metodo construtor pedindo tudo que vai ser pedido
        this.x=x;//x do objeto
        this.y=y;//y do objeto
        this.width=width;//largura do objeto
        this.height=height;//altura do objeto
        this.color=color;//nome da imagem que você quer no objeto
    }
    desenha(){//desenha a imagem do objeto selecionado
        var img=new Image();//puxa a imagem requerida e cria sua própria variável
        img.src="img/"+this.color;//coloca a pasta já, para que você puxe a imagem direto
        pincel.drawImage(img,this.x+30,this.y,this.width,this.height);//desenha a imagem com esse tamanho fixo, seria bom mudar isso pois valores fixos tem a tendência de quebrar do nada
    }

    animation(name,framee){//roda a animação, e requer que você coloque parte do nome do conjunto de imagens
        this.timer+=1;//aumenta o timer, como falado acima
        if(this.timer>12){//se o timer estiver acima de 12
            this.timer=1;//zera o timer
            this.frame+=1;//aumenta o frame
        }
        if(this.frame>framee){//se chegar no numero máximo de frames desejados
            this.frame=1;//reseta
        }
        this.color=name+this.frame+".png";//puxa os frames baseado no nome da imagem, colocado quando rodando a função, além do número do frame atual
    }
}

//subclasses da principal
class Player extends Object{//classe do player, contém as funções únicas dele
    timer2=75000;//timer do player funciona do seu próprio modo, pra contar quando que o jogo acaba //vai c foder por criar variavel d nome igual: by uga
    timeout(){//marca o tempo para o jogo fechar sozinho
        this.timer2-=10;//diminui o timer em 10 a cada vez que é rodado
    }

    haurire(){//é a função de desenho única do player
        var img=new Image();//puxa a imagem requerida e cria sua própria variável
        img.src="img/"+this.color;//coloca a pasta já, para que você puxe a imagem direto
        pincel.drawImage(img,this.x-70,this.y-300,this.width+200,this.height+270);//desenha a imagem com esse tamanho fixo, seria bom mudar isso pois valores fixos tem a tendência de quebrar do nada
    }
    
    collide(obj){//checa a colisão com cada quadrante do objeto selecionado
        //a função abaixo vê se o objeto e o jogador tem seus x e y dentro da área um do outro, com a área sendo x+widht ou y+height, ou seja ponto atual do objeto, mais a altura e largura do desenho
        if( this.x<obj.x+obj.width//se o jogador está dentro da área do objeto, em x
            &&this.x+this.width>obj.x//se o objeto está dentro da área do jogador, em x
            &&this.y<obj.y+obj.height//se o jogador está dentro da área do objeto, em y
            &&this.y+this.height>obj.y){//se o objeto está dentro da área do jogador, em y

                return true;//se sim, ent eles colidem
            }else{//senão
                return false;//não colidem
            }
    }
}
class Pag extends Object{
    pagina = 0;
    mudapagina(menu){
    switch(menu){
        case 0://menu inicial
        this.pagina=1;
            break;
        case 1://opções
        this.pagina=2;
            break;
        case 2://jogo
        this.pagina=3;
            break;
        default:
            break;
    }
}
}
class Bg extends Object{//tudo aqui é exclusivo do fundo
    desenhaBG(x,y,larg,alt){//função única de desenho do background pq eu n tava conseguindo fazer a guitarra dar bom
        var imagine=new Image();//puxa uma nova imagem e salva numa variável
        imagine.src="img/"+this.color;//mesmo rolê geral dos objetos de puxar uma imagem da pasta apropriada
        pincel.drawImage(imagine,0,0,1000,1000);//mais uma vez, mesmo rolê de antes, mas pro fundo pq eu n tava conseguindo fazer do tamanho certo (talvez por conta do nome da "var img" que é igual nas duas)
    }
}

class Tecla extends Object{//funções exclusivas das teclas que estão caindo na tela
    move(){//faz com que eles contínuamente descam na tela
        this.y+=10;//velocidade
    }
    erro(){//é a função pro botão voltar exclusiva das teclas
            this.y=-50;//reseta a posição em y
            this.posição=Math.floor(Math.random()*4); //função definidora de X
            switch(this.posição){//função geral da posição, usa a posição definida aleatóriamente em cima pra descobrir em qual das 4 linhas a tecla vai descer
                case 0://e nessa define a posição e a imagem baseado nessas definições
                    this.x=0+5;//por exemplo, aqui vai pra primeira linha
                    this.color="Disc-V.png";//e puxa o disc vermelho
                    break;
                case 1:
                    this.x=250+5;
                    this.color="Disc-Ve.png";
                    break;
                case 2:
                    this.x=250*2+5;
                    this.color="Disc-A.png";
                    break;
                case 3:
                    this.x=250*3+5;
                    this.color="Disc-Am.png";
                    break;
                Default:
                    break;
        }//nota importante: as imagens estão nomeadas V- vermelho, Ve-verde, A-azul, Am-amarelo, mude o quanto quiser, mas muda na pasta das imagens também
    }
    acerto(){//mesma função de antes, nada muda, mas ela serve apenas para os acertos, foi feita pra diferenciação de cada coisa, mas pó apagar pra diminuir o número de linhas
        this.y=-50;//reseta a posição
        this.posição=Math.floor(Math.random()*4); //função definidora de X
        switch(this.posição){
            case 0:
                    this.x=0+5;
                    this.color="Disc-V.png";
                    break;
                case 1:
                    this.x=250+5;
                    this.color="Disc-Ve.png";
                    break;
                case 2:
                    this.x=250*2+5;
                    this.color="Disc-A.png";
                    break;
                case 3:
                    this.x=250*3+5;
                    this.color="Disc-Am.png";
                    break;
                Default:
                    break;
    }
    }
}
class Text{//classe texto, é a única classe que ignora o objeto e as funções dele, lá de cima, então serve apenas para texto
    draw(texto,x,y){//tentei simplificar oqq ela faz, então você apenas digita o que quer escrito, a posição, e voilá
        pincel.font="30px Arial";//isso significa também que só tem uma fonte
        pincel.fillStyle="black";//e cor, mas isso pode ser mudado tornando os dois variáveis que você escreve quando puxa a função
        pincel.fillText(texto,x,y);//bem, após ter tudo isso pronto, tu escreve o texto pedido.
    }
}

class botao{ //coloca oq


    constructor(x,y,width,height,color){
        this.x=x;
        this.y=y;
        this.bgg= true; // true
        this.play= false;
        this.vitoria= false; // false
        this.width=width;
        this.height=height;
        this.color=color;
        this.mousex = 0;
        this.mousey = 0; 
    }


    colide(obj) { // :)

        if(this.mousex > this.x && this.mousex < this.x + this.width ){ //start click


            if(this.mousey > this.y+30 && this.mousey < this.y + this.height/2){ //start click

                obj.bgg = false;
                obj.play = true;
                this.mousex=0;
                this.mousey=0;
                Botao.erro();
                rolla.reset(); // close
             
            }


        }
       
    }// ok

    desenha() {

        var img=new Image();//puxa a imagem requerida e cria sua própria variável
        img.src="img/"+this.color;//coloca a pasta já, para que você puxe a imagem direto
        pincel.drawImage(img,this.x,this.y,this.width,this.height);//desenha a imagem com esse tamanho fixo

    }

}

   
    class Pika{ //pontuação, timer, bom e os krl

        ponto = 0;
        bom = true;
        incremento = 0;
        timer = 75000;

        reset() {// buravou
            
            this.ponto = 0;
            this.bom = true;
            this.incremento = 0;
            this.timer = 75000;

        }

    }