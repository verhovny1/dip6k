//////////Змінні для сесії//////////
    var USER_NAME = "admin";
    var USER_ID = "1";//cheng
////////////////////////////////////
    var ADMIN_ID  = "1";

//////////Змінні для роботи скриптів//////////
    //масив вхідних даних (вхід)
    var INPUT_ARRAYS_DATA = [];
    var INPUT_ARRAYS_DATA_COUNT = 0; 
    //масив вхідних даних (вихід)
    var OUTPUT_ARRAYS_DATA = [];
    var OUTPUT_ARRAYS_DATA_COUNT = 0;

    //масив нейронних мереж користувача
    var USER_NEURAL_NETORKS = [];
    var USER_NEURAL_NETORKS_COUNT = 0;
    var USER_NEURAL_NETORKS_POSITION = -1;
/////////////////////////////////////////////




//////////Функії розпізнавання тексту та навчання мережі//////////
this.startRec = function (canvasId)
{
    //rozmColorImg(canvasId, "canvas2", 5);
    //inShadesOfGray(canvasId, canvasId, "coefficients");
    //blurryColorImg(canvasId, "canvas1", 2, "averaging");
    //binarize(canvasId, canvasId, 2);
    //resample_single(canvasId, "canvas2", 324, 173);
    rozmColorImg(canvasId, "canvas3", 5);
    inShadesOfGray(canvasId, "canvas4", "coefficients");
    inShadesOfGray( canvasId, "canvas2" );
    //segmentation(canvasId, canvasId,"pixelscan");
    //segmentation(canvasId, canvasId);
    
    binarize(canvasId, canvasId, 2);
    //одержуємо 2-д масив пікселів з канвасу
    var pA = getRGB2dArrFromCanv(canvasId);   
    //знайдемо масив обєктів(букв)
    var arrText = [];
    arrText = segmentationArrayGrille(pA);


    //формуємо масив вхідних даних (строка -> слово -> символ = bin256 (бінарний масив (0 і 1) з 256 елементів )  )
    var inputArr = [];
    for (i = 0; i < arrText.length; i++)
    {
        var words = [];
        for (n = 0; n < arrText[i].length; n++)
        {
            var symbols = [];
            for (z = 0; z < arrText[i][n].length; z++)
            {
                //одержимо масив пікселів
                var aT = arrText[i][n][z];
                var data = get2dArrFrom2dArr(pA,aT.left,aT.top,aT.right,aT.bottom);
                //Змінюємо розміри до 16 на 16
                var var16x16 = resampleSingleArr(data,16,16);
                //проводимо бiнаризацію масиву
                var bin16x16 = binarizeArray(var16x16,127);
                //конвертуємо масив в одномірний
                var bin256 = C2Dto1D(bin16x16);

                //записуємо
                sumHny = {};
                sumHny.left = aT.left;
                sumHny.top = aT.top;
                sumHny.right = aT.right;
                sumHny.bottom = aT.bottom;
                sumHny.data = data;
                sumHny.var16x16 = var16x16;
                sumHny.bin16x16 = bin16x16;
                sumHny.bin256 = bin256;
     
                symbols[z] = sumHny;
            }
            words[n] = symbols;
        }
        inputArr[i] = words;
    }


    var network_id = $("#neuralNetworksSelect option:selected ").val(); //6;
    //Беремо з бази джсон для нейромережі
    $.post("/_php_scripts/get_network_from_id.php",
    {
        network_id: network_id
    },
    function(data, status)
    { 
        if (data != "0 results")
        {
            var obj = JSON.parse( data );
            var netwJson = obj[0].network_json; //джсон нейромережі
            var netSymbols = obj[0].network_symbols;//список стмволів нейромережі
 
            if ( netwJson != "")
            {
                //створюємо екземпляр мережі
                var net = new brain.NeuralNetwork({
                  activation: 'sigmoid', // Функція активації
                  hiddenLayers: [16,16,16], // Три шари з 4-ма перептронами
                  learningRate: 0.6 // Глобальна швидкість навчання, корисна при тренуванні з використанням потоків
                });
                //втавляємо джсон обученої мережі
                net.fromJSON(  JSON.parse(   netwJson   ) );


                //
                var responseText = "";
                for (i = 0; i < inputArr.length; i++)
                {
                    var words = [];
                    for (n = 0; n < inputArr[i].length; n++)
                    {
                        var symbols = [];
                        for (z = 0; z < inputArr[i][n].length; z++)
                        {
                            var output = net.run( inputArr[i][n][z].bin256 );
                            //document.write( JSON.stringify( output )  + "<br><br>" );

                            var max = parseFloat( output[0] ) ; var maxPos = 0;
                            for (var m = 0; m < netSymbols.length ; m++) //for (var m = 0; m < output.length ; m++) - не работает с-чка
                            {
                                if ( max < parseFloat(output[m]) )
                                {
                                    max = parseFloat(output[m]);
                                    maxPos = m;
                                }
                            }
                            //document.write( "max = " + max + "  maxPos=" + maxPos + "<br><br>");
                            //document.write( "parseFloat=" + ( parseFloat(output[0]) + parseFloat(output[1]) )  + "<br><br>" );
                            //document.write( "parseFloat=" + (  output[0] + output[1] )  + "<br><br>" );

                            responseText += netSymbols[maxPos];

                        }
                        responseText+=" ";
                    }
                    responseText+="<br>";
                }

                $("#recognitionResultDiv").html(responseText);
                //document.write( responseText );   
            }
            else
            {
                $("#recognitionResultDiv").html("Обрана вами нейромережа не обучена");
            }
        }
    }); 
    
    alert("It's work"); 
}
this.traitNerl = function (canvasId)
{
    //бінаризуємо вхідне зображення
    binarize(canvasId, canvasId, 2);
    //одержуємо 2-д масив пікселів з канвасу
    var pA = getRGB2dArrFromCanv(canvasId);   
    //знайдемо масив обєктів(букв)
    var arrText = [];
    arrText = segmentationArrayGrille(pA);


    //формуємо глобальний масив вхідних даних
    INPUT_ARRAYS_DATA = [];
    INPUT_ARRAYS_DATA_COUNT = 0;
    for (i = 0; i < arrText.length; i++)
    {
        //document.write("Строка №" + (i+1) + "<br>");
        for (n = 0; n < arrText[i].length; n++)
        {
            //document.write("Слово №" + (n+1) + "<br>");
            for (z = 0; z < arrText[i][n].length; z++)
            {
                //принт
                //document.write("Символ №" + (z+1) + "(T:" + arrText[i][n][z].top + ",B:" + arrText[i][n][z].bottom + ",L:" + arrText[i][n][z].left + ",R:" + arrText[i][n][z].right + ") ");
                //document.write("<br>");     

                //одержимо масив пікселів
                var aT = arrText[i][n][z];
                var data = get2dArrFrom2dArr(pA,aT.left,aT.top,aT.right,aT.bottom);
                //Змінюємо розміри до 16 на 16
                var var16x16 = resampleSingleArr(data,16,16);
                //принт
                /*document.write("<br>"); 
                for (var k = 0; k < 16; k++) 
                {
                    for (var p = 0; p < 16; p++) 
                    {
                        if(var16x16[k][p].R < 127 ) document.write( 0 );
                        else   document.write("_" );      
                    }  
                    document.write("<br>");  
                }
                document.write("<br>");*/ 

                //проводимо бынаризацію масиву
                var bin16x16 = binarizeArray(var16x16,127);
                //принт
                /*document.write("<br>"); 
                for (var k = 0; k < 16; k++) 
                {
                    for (var p = 0; p < 16; p++) 
                    {
                        if( bin16x16[k][p] == 0 ) document.write( bin16x16[k][p] );   
                        else document.write( "_");   
                    }  
                    document.write("<br>");  
                }
                document.write("<br>"); */

                //конвертуємо масив в одномірний
                var bin256 = C2Dto1D(bin16x16);
                //принт
                /*document.write("<br>");
                for (var k = 0; k < bin256.length; k++) document.write( bin256[k] );
                document.write("<br>");*/
        
                //записуємо
                sumHny = {};
                sumHny.left = aT.left;
                sumHny.top = aT.top;
                sumHny.right = aT.right;
                sumHny.bottom = aT.bottom;
                sumHny.data = data;
                sumHny.var16x16 = var16x16;
                sumHny.bin16x16 = bin16x16;
                sumHny.bin256 = bin256;
     
                INPUT_ARRAYS_DATA[INPUT_ARRAYS_DATA_COUNT] = sumHny;
                INPUT_ARRAYS_DATA_COUNT ++; 
            }
        }
        //document.write("<br>");

    }


    //одержимо всі мережі користувача
    $.post("/_php_scripts/get_user_networks.php",
    {
        user_id: USER_ID
    },
    function(data, status)
    { 
        USER_NEURAL_NETORKS_COUNT = 0;
        USER_NEURAL_NETORKS = [];
         
        if (data != "0 results")
        {
            var obj = JSON.parse( data );

            for (var i = 0; i < obj.length; i++) 
            {
                var UNN = {};
                UNN.network_id = obj[i].network_id;
                UNN.network_name = obj[i].network_name;
                UNN.network_json = obj[i].network_json;
                UNN.network_symbols = obj[i].network_symbols;
                UNN.network_activation_function = obj[i].network_activation_function;
                UNN.network_hidden_layers = obj[i].network_hidden_layers;

                USER_NEURAL_NETORKS[i] = UNN;
                USER_NEURAL_NETORKS_COUNT ++;
            };

            //відкриваємо попап
            showPopup('/_popups/networksPopup.html');
        }
    });


    //відкриваємо попап
    //showPopup('/_popups/popup.html');

    
    alert("It's work");
}














//Повертає значення не менше (і, можливо, рівне) min, і менше (і не дорівнює) max.
function getRandomArbitrary(min, max) 
{
  return Math.round(  Math.random() * (max - min) + min  );
}
//Не памятаю для чого вона
function getUrlVars()
{
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
//Функії попапа
function showPopup( urlPopupData )
{
    var modal = document.getElementById('myModal');
    modal.style.display = "block";

    $("#popupContent").load( urlPopupData );
}
function closePopup ()
{
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
    var modal = document.getElementById('myModal');

    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/
//Годинник в футері
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            return _this.span.innerHTML = new Date().toUTCString();
        }, 500);
    };

    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};






 
 

 
