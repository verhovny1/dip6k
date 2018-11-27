///////////////////////////////////////////////////
////w2itr - work with images and text recognition//
////criator is a Maxim Golovin (Verhovny Menko)////
///////////////////////////////////////////////////




 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////Допоміжні функції///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Формує 2д масив (RGBA) значень з вхідного 1д масиву пікселей imageData.data, ширини та висоти зображення
//Звернення до результатів відб. наступним чином: A[i][j].R
this.getRGB2dArr = function(arr,w,h)
{  
    var PointsMas = []; //сам масив точок	(зверненя: PointsMas[1][1]["B"]  або PointsMas[1][1].B де В=(R,G,B,A)
    var counter = 0; //$("#TrackingjsData").append("<br>");  
    for (var i = 0; i < h ; i++) {
        SummMass = []; // проміжний масив-строка 
        for (var n = 0; n < w  ; n++) {
            var MY_RGBA = {}; // проміжний обєкт для запису свойств
            MY_RGBA.R = arr[counter];
            MY_RGBA.G = arr[counter + 1];
            MY_RGBA.B = arr[counter + 2];
            MY_RGBA.A = arr[counter + 3];
            SummMass[n] = MY_RGBA;
            counter += 4;
            //$("#TrackingjsData").append( MY_RGBA.R +" ");  
        };  
        PointsMas[i] = SummMass; //$("#TrackingjsData").append("<br>");
    };

    return PointsMas
}
//Формує 1д масив пікселей imageData.data з вхідного 2д (RGBA) масиву типу A[i][j].R
this.set2dArrRGB = function(arr)
{
    var retArr = new Array();
    var count = 0;

    for (i = 0; i<arr.length;i++)
    {
        for (n = 0; n<arr[i].length;n++)
        {
            retArr[count] = arr[i][n].R;
            retArr[count+1] = arr[i][n].G;
            retArr[count+2] = arr[i][n].B;
            retArr[count + 3] = arr[i][n].A;

            count += 4;
        }
    }

    return retArr;
}
//Функція конвертації 1д масиву в 2д. на вході масив і ширина та висота вихідного масиву
this.C1Dto2D = function ( A1D,n,m )
{
    var num = 0;
    var A2D = new Array();

    for( var i = 0; i < n; i++)
    {
        A2D[i] = new Array();
        for ( var j = 0; j < m; j++)
        {
            A2D[i][j] = A1D[num];
            num++;
        }
    }

    return A2D;
}
//функція конвертації 2д масиву в 1д. на вході 2д масив, на виході 1д масив.
function C2Dto1D ( arr )
{
    var retAr = [];

    for (var k = 0; k < arr.length; k++) 
    {
        for (var p = 0; p < arr[k].length; p++) 
        {
            retAr[ arr.length * k + p] = arr[k][p];
        }
    }  

    return retAr;
}
this.getRGBA = function(r,g,b,a)
{
    RGBA = {};
    RGBA.R = r;
    RGBA.G = g;
    RGBA.B = b;
    RGBA.A = a;

    return RGBA;
}
//одержати 2д масив пыкслелів з канвасу
this.getRGB2dArrFromCanv = function(canvasId)
{
    //находим canvas
    var canvas = document.getElementById(canvasId);
    // получаем его 2D контекст
    var context = canvas.getContext('2d');
    // получаем объект, описывающий внутреннее состояние области контекста
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    //розпаковуємо одномірний масив R D G A в 2Д масив  R D G A
    var pA = getRGB2dArr(data, canvas.width, canvas.height);

    return pA;
}
//Записати 2д масив пікслелыв в канвас
function setArrToCanvas( arr , canvasId)
{
    var H = arr.length;
    var W = 1;
    if ( H > 0 )  W =  arr[0].length;
    
    //находим canvas
    var canvas = document.getElementById(canvasId);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = W;
    canvas.height.width = H;

    var context = canvas.getContext('2d');
    var imageData = context.getImageData(0, 0, W, H);
    var data = imageData.data;

    //розпаковуємо одномірний масив R D G A в 2Д масив  R D G A
    var pA = getRGB2dArr(data, W, H);

    for (var i = 0; i < arr.length; i++)
    {
        for (var n = 0; n < arr[i].length; n++)
        {
            pA[i][n].R =  arr[i][n].R;
            pA[i][n].G =  arr[i][n].G;
            pA[i][n].B =  arr[i][n].B;
            pA[i][n].A =  arr[i][n].A;
        }
    }

    //Упаковуємо 2Д масив R D G A в одномірний
    dataArray = set2dArrRGB(pA);
    for (i = 0; i < data.length; i += 1) { data[i] = dataArray[i]; }
    context.putImageData(imageData, 0, 0);
}
//одержати 2д масив з 2д масиву
this.get2dArrFrom2dArr = function(pA, Mleft, Mtop, Mright,Mbottom )
{
    var data = []; 
    var count1 = 0;  
    for (var k =  Mtop; k <= Mbottom; k++) 
    {
        var da = []; 
        var count2 = 0;
        for (var t = Mleft; t <= Mright; t++) 
        {
            da[count2] = pA[k][t];
            count2++;
        }
        data[count1] = da;
        count1++;
    }

    return data;
}
//Скопіювати канвас
function copyCanvas(canvasId , canvasToId)
{
    var canvas = document.getElementById( canvasId );
    var context = canvas.getContext('2d');  
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);


    var canvasTo = document.getElementById( canvasToId );
        canvasTo.width = canvas.width;
        canvasTo.height = canvas.height;
        canvasTo.style.width = canvas.style.width;
        canvasTo.style.height = canvas.style.height;
    var contextTo = canvasTo.getContext('2d');
    contextTo.putImageData(imageData, 0, 0);
}
function draRestlengOnCanvas(canvasId,canvastoId, MYleft,MYtop,MYright,MYbottom , RGBA)
{
    //находим canvas
    var canvas = document.getElementById(canvasId);
    // получаем его 2D контекст
    var context = canvas.getContext('2d');
    // получаем объект, описывающий внутреннее состояние области контекста
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;  

    //розпаковуємо одномірний масив R D G A в 2Д масив  R D G A
    var pA = getRGB2dArr(data, canvas.width, canvas.height);
   
        for (var m = MYtop; m <= MYbottom; m++) { pA[m][MYleft].R = RGBA.R; pA[m][MYleft].G = RGBA.G; pA[m][MYleft].B = RGBA.B; pA[m][MYleft].A = RGBA.A;  }
        for (var m = MYtop; m <= MYbottom; m++) { pA[m][MYright].R = RGBA.R; pA[m][MYright].G = RGBA.G; pA[m][MYright].B = RGBA.B; pA[m][MYright].A = RGBA.A;}
        for (var m = MYleft; m <= MYright; m++) { pA[MYtop][m].R = RGBA.R; pA[MYtop][m].G = RGBA.G; pA[MYtop][m].B = RGBA.B; pA[MYtop][m].A = RGBA.A;}
        for (var m = MYleft; m <= MYright; m++) { pA[MYbottom][m].R = RGBA.R; pA[MYbottom][m].G = RGBA.G; pA[MYbottom][m].B = RGBA.B; pA[MYbottom][m].A = RGBA.A;}

    //Упаковуємо 2Д масив R D G A в одномірний
    dataArray = set2dArrRGB(pA);
    //Замінюємо елементи у масиві пікселей imageData.data
    for (var i = 0; i < data.length; i += 1) { data[i] = dataArray[i]; }

    // создаем или находим canvas
    var canvasTo = document.getElementById(canvastoId);
        canvasTo.width = canvas.width;
        canvasTo.height = canvas.height;
        canvasTo.style.width = canvas.style.width;
        canvasTo.style.height = canvas.style.height;
    // получаем его 2D контекст
    var contextTo = canvasTo.getContext('2d');
    //вставляємо imageData у context канваса
    contextTo.putImageData(imageData, 0, 0);
}


//Формує масив строчок та букв з кординатами верху та низу, ліво та право типу arrText[№ строки][№ слова][№ букви].top 
//На вході масив типу A[][].R де R може бути R,G,B,A 
this.segmentationArrayGrille = function (arr)
{
    //знайдемо координати верзу і низу кожної строчки
    var arrLines = []; //масив з кординатами верху та низу строчок типу arrLines[].first i arrLines[].last 
    var firstBlack = 0;
    var lastBlack = 0;
    var isWite = true;
    count = 0;
    for (i = 0; i < arr.length; i++) //пройдемо по висоті (строкам)
    {  
        isOllWite = true; //вся строка складається із білих пікселей
        for (n = 0; n < arr[i].length; n++)
        {
            if (arr[i][n].R != 255) {
                isOllWite = false;
                break;
            }
        }
        
        if (isOllWite == false && isWite == false && i != arr.length-1) //якщо знайдена чорна полоса і був чорний колір
        {
            lastBlack = i;
        }      
        else if (isOllWite == false && isWite == true) //якщо знайдена чорна полоса a був білий колір
        {
            firstBlack = i;
            isWite = false;
        }
        else if (isOllWite == true && isWite == true)//якщо знайдена біла полоса і йде білий колір
        {
        }
        else if ( isOllWite == true   &&  isWite == false  ) //якщо знайдена біла полоса a був чорний колір
        {
            var stroka = {}; // проміжний обєкт для запису свойств
            stroka.first = firstBlack;
            stroka.last = lastBlack;
            arrLines[count] = stroka;

            count++;
            isWite = true;
        }
        else if (i == arr.length - 1 && isWite == false) //якщо   кінець a був чорний колір
        {
            //alert("4");
            var stroka = {}; // проміжний обєкт для запису свойств
            stroka.first = firstBlack;
            stroka.last = arr.length - 1;
            arrLines[count] = stroka;
        }
    }

    //знайдемо координати кожної букви
    arrText = []; 
    for( i = 0; i <arrLines.length;i++)//перебираємо кожну з отриманих строк
    {
        var stroka = [];
        firstBlack = 0;
        lastBlack = 0;
        isWite = true;
        count = 0;

        for (n = 0; n < arr[0].length; n++)//йдемо по ширині(строкі)
        {
            //перевіремо кожен стовбець
            isOllWite = true; //увесь стовбчик складається із білих пікселей
            for (m = arrLines[i].first; m <= arrLines[i].last; m++)
            {
                if (arr[m][n].R != 255) 
                {
                    isOllWite = false;
                    break;
                }
            }
             
            if (isOllWite == false && isWite == false && i != arr[0].length - 1) //якщо знайдена чорна полоса і був чорний колір
            {
                lastBlack = n;
            }
            else if (isOllWite == false && isWite == true) //якщо знайдена чорна полоса a був білий колір
            {
                firstBlack = n;
                isWite = false;
            }
            else if (isOllWite == true && isWite == true)//якщо знайдена біла полоса і йде білий колір
            {}
            else if (isOllWite == true && isWite == false) //якщо знайдена біла полоса a був чорний колір
            {
                var bukva = {}; // проміжний обєкт для запису свойств
                bukva.left = firstBlack;
                bukva.right = lastBlack;
                bukva.top = arrLines[i].first;
                bukva.bottom = arrLines[i].last;

                stroka[count] = bukva;

                count++;
                isWite = true;
            }
            else if (i == arr[0].length - 1 && isWite == false) //якщо   кінець a був чорний колір
            {
                var bukva = {}; // проміжний обєкт для запису свойств
                bukva.left = firstBlack;
                bukva.right = arr[0].length - 1;
                bukva.top = arrLines[i].first;
                bukva.bottom = arrLines[i].last;

                stroka[count] = bukva;
            }
        }

        arrText[arrText.length] = stroka;
    }



    //Знайдемо середні висоти символів в строках
    var mediumAltitude = [];
    var mediumAllHeight = 0;
    for (var i = 0; i < arrText.length; i++)
    {
        var serednVisota = 0;
        for (var n = 0; n < arrText[i].length; n++) 
        {

            var thisTop = arrText[i][n].top;
            var thisBottom = arrText[i][n].bottom;

            var topIsNotEmpty = false;
            var bottomIsNotEmpty = false;

            while( topIsNotEmpty == false  && thisTop < thisBottom)
            {
                topIsNotEmpty = false;
                for (var p = arrText[i][n].left; p <= arrText[i][n].right; p ++) 
                {
                    if ( arr[thisTop][p].R == 0 ) topIsNotEmpty = true;

                }
                if ( topIsNotEmpty == false)  thisTop ++;
            }
            while( bottomIsNotEmpty == false  && thisTop < thisBottom)
            {
                bottomIsNotEmpty = false;
                for (var p = arrText[i][n].left; p <= arrText[i][n].right; p ++) 
                {
                    if ( arr[thisBottom][p].R == 0 ) bottomIsNotEmpty = true;

                }
                if ( bottomIsNotEmpty == false)  thisBottom --;
            }
            serednVisota += (thisBottom - thisTop) + 1;

        }
        serednVisota = serednVisota / arrText[i].length;

        mediumAltitude[i] = serednVisota;
        mediumAllHeight+=serednVisota;
    }
    mediumAllHeight = mediumAllHeight / mediumAltitude.length;

    /*for (var i = 0; i < mediumAltitude.length; i++) {
        document.write( mediumAltitude[i] +"<br>" );
    };
    document.write( "<br>" );
    for (var i = 0; i < arrText.length; i++) document.write( (arrText[i][0].bottom - arrText[i][0].top +1) +  "<br>" );*/


    //видалимо пусті пікселі зверху та з низу (доки їх не залишиться, або  символ не стане меншив за середню висооту)
    for (var i = 0; i < arrText.length; i++)
    {
        for (var n = 0; n < arrText[i].length; n++) 
        {
            var aT = arrText[i][n];
            var posit = "bottom";
            var topIsNotEmpty = false;
            var bottomIsNotEmpty = false;

            while ( (topIsNotEmpty == false || bottomIsNotEmpty == false) && (aT.bottom - aT.top + 1) > mediumAllHeight  )
            {
                if ( posit == "bottom" )
                {
                    bottomIsNotEmpty = false;
                    for (var p = aT.left; p <= aT.right; p ++) 
                    {
                        if ( arr[ aT.bottom ][p].R == 0 ) bottomIsNotEmpty = true;

                    }
                    if ( bottomIsNotEmpty == false)  aT.bottom --;

                    posit = "top";
                }
                else if ( posit == "top" )
                {
                    topIsNotEmpty = false;
                    for (var p = aT.left; p <= aT.right; p ++) 
                    {
                        if ( arr[ aT.top ][p].R == 0 ) topIsNotEmpty = true;

                    }
                    if ( topIsNotEmpty == false)  aT.top ++;

                    posit = "bottom";
                }      
            }


            arrText[i][n] = aT;
        }    
    }


    var structArrText = [];
    //поділимо строчки з буквами на строчки зі словами
    for (var i = 0; i < arrText.length; i++) //по строчкам
    {

        var words = [];//масив слів
        var countWords = 0;

        //знайдемо середню відстань між буквами
        var serVidstup = 0; var vidstup = 0; var vidstupCount = 0;
        for (var n = 1; n < arrText[i].length; n++) //По символам строки
        {
            vidstup += (arrText[i][n].left-1) - (arrText[i][n-1].right+1) + 1;
            vidstupCount++;
        }    
        serVidstup = vidstup / vidstupCount;


        var symbols = []; //масив символыв у слові
        var countSymbols = 0;
        //пройдемо по  строкі та сформуємо слова
        symbols[0] = arrText[i][0];
        countSymbols ++;
        for (var n = 1; n < arrText[i].length; n++) //По символам строки
        {
            if( (arrText[i][n].left - 1) - (arrText[i][n-1].right+1)  + 1  > serVidstup ) //ставимо пробіл
            {
                words[countWords] = symbols;
                countWords++;

                symbols = [];
                countSymbols = 0;
                symbols[0] = arrText[i][n];
                countSymbols++;
            }
            else
            {
                symbols[countSymbols] =arrText[i][n];
                countSymbols++;
            }
        }
        words[countWords] = symbols;
        countWords++;


        structArrText[i] = words;
    }

    for (var i = 0; i < structArrText.length; i++) 
        for (var n = 0; n < structArrText[i].length; n++)
            for (var z = 0; z < structArrText[i][n].length; z++) 
            {
                var aT = structArrText[i][n][z];

                try 
                {
                    if( aT.left < 0 ) structArrText[i][n][z].left = 0;
                    else if( aT.left >= arr[0].length ) structArrText[i][n][z].left = arr[0].length - 1;

                    if( aT.right < 0 ) structArrText[i][n][z].right = 0;
                    else if( aT.right >= arr[0].length ) structArrText[i][n][z].right = arr[0].length - 1;

                    if( aT.top < 0 ) structArrText[i][n][z].top = 0;
                    else if( aT.top >= arr.length ) structArrText[i][n][z].top = arr.length - 1;

                    if( aT.bottom < 0 ) structArrText[i][n][z].bottom = 0;
                    else if( aT.bottom >= arr.length ) structArrText[i][n][z].bottom = arr.length - 1;
                } catch (e)
                {
                    simv = {};
                    simv.left = 0;
                    simv.right = 0;
                    simv.top = 0;
                    simv.bottom = 0;
                    structArrText[i][n][z] = simv;
                }

            }

    return structArrText;

    /*//знайдемо пробіли між буквами
    for (var i = 0; i < arrText.length; i++)
    {
        var serVidstup = 0; var vidstup = 0; var vidstupCount = 0;
        for (var n = 1; n < arrText[i].length; n++) 
        {
            vidstup += (arrText[i][n].left-1) - (arrText[i][n-1].right+1);
            vidstupCount++;
        }    
        serVidstup = vidstup / vidstupCount;
    
        var newArr = []; 
        newArr[0] = arrText[i][0];
        var newArrCount = 1;
        for (var n = 1; n < arrText[i].length; n++) 
        {
            if( (arrText[i][n].left - 1) - (arrText[i][n-1].right+1)   >= serVidstup ) //ставимо пробіл
            {
                var probil={};
                probil.left = arrText[i][n-1].right+1;
                probil.right = arrText[i][n].left-1;
                probil.top = arrText[i][n].top;
                probil.bottom = arrText[i][n].bottom;

                newArr[newArrCount] =  probil;
                newArrCount ++;
            }

            newArr[newArrCount] =  arrText[i][n];
            newArrCount ++;
        }
        arrText[i] = newArr;    
    }*/
    
    //return arrText;
}
//Формує масив обєктів з координатами верху,низу,ліво,право типу findObjects[№ обєкта]top та масиву координат пікселей X,Y типу findObjects[№ обєкта].obg[№ пікселя].X
//На вході масив типу A[][].R де R може бути R,G,B,A 
this.segmentationArrayPixelscan = function (arr)
{
    var metod = "all";
    if (arguments.length == 2) metod = arguments[1];

    var H = arr.length; 
    var W = arr[0].length;

    //створюємо масив показуючий наявність пікселя
    var isEmpty = new Array();
    for (i=0;i<H;i++){
        wr = new Array();
        for (n=0;n<W;n++){
            wr[n] = true;
        }
        isEmpty[i] = wr;
    }
    
    var findObjects = new Array();//масив для знайдених обєктів
    //тепер пройдемося по кажному пікселю зображення
    for (i = 0; i < H; i++)//згори до низу
    {
        for (n = 0; n < W; n++)//зліва на право
        {
            
            //якщо піксель не існує
            if (isEmpty[i][n] == false) { }
            //якщо піксель існує і він білий - пропускаємо, видаляючи піксель
            else if (isEmpty[i][n] == true && arr[i][n].R != 0)
            {
                isEmpty[i][n] = false;
            }
            //якщо піксель існує і він чорного кольору - виявлено обєкт - починаємо виявляти всі його піксклі
            else if (isEmpty[i][n] == true && arr[i][n].R == 0)
            {
                //поміщаємо знайдений піксель у буфер та видаляємо його з існуючих
                var newObj = {};
                newObj.X = n;
                newObj.Y = i;
                var buf = new Array();//буфер для пікселів
                buf[0] = newObj;
                bufCount = 1;
                isEmpty[i][n] = false;//видаляємо з існуючих
                 
                var objPixels = new Array();
                //доки в буфері є елементи
                while (bufCount > 0)
                {
                     
                    //перевіряємо сусідні пікселі, якщо вони чорні і існують - додаємо у буфер
                    if (metod == "all")
                    {
                        for (My = buf[0].Y - 1  ; My <= buf[0].Y + 1 ; My++)
                            for (Mx = buf[0].X - 1  ; Mx <= buf[0].X + 1 ; Mx++)
                                if (My >= 0 && My < H && Mx >= 0 && Mx < W && arr[My][Mx].R == 0 && isEmpty[My][Mx] == true) //якщо піксель в межах зображення і чорний і існує - записуємо його в буфер
                                {
                                    newObj2 = {};
                                    newObj2.X = Mx;
                                    newObj2.Y = My;
                                    buf[bufCount] = newObj2;
                                    bufCount++;
                                    isEmpty[My][Mx] = false;
                                }
                    }
                    else if (metod == "straight")
                    {
                        for (My = buf[0].Y - 1  ; My <= buf[0].Y + 1 ; My++)
                            for (Mx = buf[0].X - 1  ; Mx <= buf[0].X + 1 ; Mx++)
                                if (My >= 0 && My < H && Mx >= 0 && Mx < W && arr[My][Mx].R == 0 && isEmpty[My][Mx] == true) //якщо піксель в межах зображення і чорний і існує - записуємо його в буфер
                                {
                                    if ( (Mx == buf[0].X - 1 && My == buf[0].Y) || (Mx == buf[0].X + 1 && My == buf[0].Y) || (Mx == buf[0].X && My == buf[0].Y - 1) || (Mx == buf[0].X && My == buf[0].Y+1) )
                                    newObj2 = {};
                                    newObj2.X = Mx;
                                    newObj2.Y = My;
                                    buf[bufCount] = newObj2;
                                    bufCount++;
                                    isEmpty[My][Mx] = false;
                                }
                    }
                    else if (metod == "diagonal")
                    {
                        for (My = buf[0].Y - 1  ; My <= buf[0].Y + 1 ; My++)
                            for (Mx = buf[0].X - 1  ; Mx <= buf[0].X + 1 ; Mx++)
                                if (My >= 0 && My < H && Mx >= 0 && Mx < W && arr[My][Mx].R == 0 && isEmpty[My][Mx] == true) //якщо піксель в межах зображення і чорний і існує - записуємо його в буфер
                                {
                                    if ((Mx == buf[0].X - 1 && My == buf[0].Y-1) || (Mx == buf[0].X + 1 && My == buf[0].Y - 1) || (Mx == buf[0].X -1 && My == buf[0].Y + 1) || (Mx == buf[0].X + 1 && My == buf[0].Y + 1))
                                    newObj2 = {};
                                    newObj2.X = Mx;
                                    newObj2.Y = My;
                                    buf[bufCount] = newObj2;
                                    bufCount++;
                                    isEmpty[My][Mx] = false;
                                }
                    }
                    

                     
                    //Записуємо поточний піксель і масив пікселей обєкта, видаляємо його з існуючих та з буфера
                    objPixels[objPixels.length] = buf[0];
                    //isEmpty[ buf[0].Y ][ buf[0].X ] = false;
                    for (m = 0; m < bufCount - 1; m++) buf[m] = buf[m + 1];
                    bufCount--;
                }

                //маючи масив пікселей обєкта: знаходимо maxX,minX,maxY,minY та все записюємо у масив обєктів
                maxX = objPixels[0].X;
                minX = objPixels[0].X;
                maxY = objPixels[0].Y;
                minY = objPixels[0].Y;
                for (a = 0; a < objPixels.length; a++)
                {
                    if (objPixels[a].X > maxX) maxX = objPixels[a].X;
                    if (objPixels[a].X < minX) minX = objPixels[a].X;
                    if (objPixels[a].Y > maxY) maxY = objPixels[a].Y;
                    if (objPixels[a].Y < minY) minY = objPixels[a].Y;
                }
                newObj2 = {};
                newObj2.left = minX;
                newObj2.right = maxX;
                newObj2.top = minY;
                newObj2.bottom = maxY;
                newObj2.obg = objPixels;
                findObjects[findObjects.length] = newObj2;
            }        

        }
    }

    /*document.write("Знайдені обєкти:");
    for (i = 0; i < findObjects.length; i++) {
        document.write("<br>Обєкт№" + (i + 1) + "<br>");
        document.write("<br>left=" + findObjects[i].left + " right=" + findObjects[i].right + " top=" + findObjects[i].top + " bottom=" + findObjects[i].bottom+"<br>");

        for (n = 0; n < findObjects[i].obg.length; n++) {
            
            document.write("(" + findObjects[i].obg[n].X + "," + findObjects[i].obg[n].Y + ")");
        }

    }*/
    
    /*document.write("Знайдені обєкти:");
    for (i = 0; i < findObjects.length; i++)
    {
        document.write("<br>Обєкт№" + (i + 1) + "<br>пікселі:");
        for (n = 0; n < findObjects[i].length; n++)
        {
            document.write("(" + findObjects[i][n].X + "," + findObjects[i][n].Y+")");
        }

    }*/

    return findObjects;
}










///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////Функції обробки зображення//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//+-
//функція розмиття кольорового або сірого зображенння
//вхідні параметри:
//canvasId  та canvastoId - айді вхідного та вихідного канвасу
//core(3-ій параметр(не обовязково) ) - описує величину ядра розмивки та приймає значення 0,1,2... що значить розміри ядра
//1 - вхідне зобр. не змін., 3х3, 5х5...  відповідно
//metod (4-ий параметр(не обовязково) ) - описує метод розмиття зображення та приймає значеня: averaging, gauss, median. 
this.blurryColorImg = function (canvasId, canvastoId)
{
    var core = 1;
    var metod = "averaging";
    if (arguments.length >= 3) core = arguments[2];
    if (arguments.length >= 4) metod = arguments[3];

    //находим canvas
    var canvas = document.getElementById(canvasId);
    //ширина і висота канваса(зображення)
    var W = canvas.width;
    var H = canvas.height;
    // получаем его 2D контекст
    var context = canvas.getContext('2d');
    // получаем объект, описывающий внутреннее состояние области контекста
    var imageData = context.getImageData(0, 0, W, H);
    var data = imageData.data;

    //розпаковуємо одномірний масив R D G A в 2Д масив  R D G A
    var pA = getRGB2dArr(data, W, H);

    //Проводимо розмиття
    if (metod == "averaging")
    {
 
        for (i = 0; i < H ; i++) {
            for (j = 0; j < W; j++) {
 
                var sumR = 0, sumG = 0, sumB = 0;
                count = 0;
                for (m = i - core; m <= i + core; m++)
                    for (n = j - core; n <= j + core; n++)
                        if (m >= 0 && m < H && n >= 0 && n < W)
                        {
                            sumR += pA[m][n].R;
                            sumG += pA[m][n].G;
                            sumB += pA[m][n].B;
                            count++;
                        }
                pA[i][j].R = Math.round(sumR / count);
                pA[i][j].G = Math.round(sumG / count);
                pA[i][j].B = Math.round(sumB / count);

            }
        }
    }
    else if (metod == "gauss")
    {

    }
    else if (metod == "median")
    {

    }
 
    //Упаковуємо 2Д масив R D G A в одномірний
    dataArray = set2dArrRGB(pA);
    //Замінюємо елементи у масиві пікселей imageData.data
    for (i = 0; i < data.length; i += 1) { data[i] = dataArray[i]; }

    // создаем или находим canvas
    var canvasTo = document.getElementById(canvastoId);
    canvasTo.width = canvas.width;
    canvasTo.height = canvas.height;
    canvasTo.style.width = canvas.style.width;
    canvasTo.style.height = canvas.style.height;
    // получаем его 2D контекст
    var contextTo = canvasTo.getContext('2d');
    //вставляємо imageData у context канваса
    contextTo.putImageData(imageData, 0, 0);
}

//--
//функція розмиття кольорового зображенння
//на вході: ід вх. канваса, ід вих. канваса(може бути вх.) та параметр, що приймає значення: 3,5,7 - 3 якщо щось інше
this.rozmColorImg = function (canvasId,canvastoId, param)
{

    //находим canvas
    var canvas = document.getElementById(canvasId);
    //ширина і висота канваса(зображення)
    var W = canvas.width;
    var H = canvas.height;
    // получаем его 2D контекст
    var context = canvas.getContext('2d');  
    // получаем объект, описывающий внутреннее состояние области контекста
    var imageData = context.getImageData(0, 0, W, H);
    var data = imageData.data;

    //розпаковуємо одномірний масив R D G A в 2Д масив  R D G A
    var pA = getRGB2dArr(data, W, H);
     
    //Проводимо розмиття
    if (param == 7)
        for (i = 3; i < H - 3; i++) {
            for (j = 3; j < W - 3; j++) {

                var sumR = 0, sumG = 0, sumB = 0;

                for (n = i - 3; n <= i + 3; n++)
                    for (m = j - 3; m <= j + 3; m++) {
                        sumR += pA[n][m].R;
                        sumG += pA[n][m].G;
                        sumB += pA[n][m].B;
                    }

                pA[i][j].R = Math.round(sumR / 49);
                pA[i][j].G = Math.round(sumG / 49);
                pA[i][j].B = Math.round(sumB / 49);
            }
        }
    else if (param == 5)
        for (i = 2; i < H - 2; i++) {
            for (j = 2; j < W - 2; j++) {
                pA[i][j].R = Math.round((pA[i - 2][j - 2].R + pA[i - 1][j - 2].R + pA[i][j - 1].R + pA[i + 1][j - 2].R + pA[i + 2][j - 2].R + pA[i - 2][j - 1].R + pA[i - 1][j - 1].R + pA[i][j - 1].R + pA[i + 1][j - 1].R + pA[i + 2][j - 1].R + pA[i - 2][j].R + pA[i - 1][j].R + pA[i + 1][j].R + pA[i + 2][j].R + pA[i - 2][j + 1].R + pA[i - 1][j + 1].R + pA[i][j + 1].R + pA[i + 1][j + 1].R + pA[i + 2][j + 1].R + pA[i - 2][j + 2].R + pA[i - 1][j + 2].R + pA[i][j + 2].R + pA[i + 1][j + 2].R + pA[i + 2][j + 2].R) / 24);
                pA[i][j].G = Math.round((pA[i - 2][j - 2].G + pA[i - 1][j - 2].G + pA[i][j - 1].G + pA[i + 1][j - 2].G + pA[i + 2][j - 2].G + pA[i - 2][j - 1].G + pA[i - 1][j - 1].G + pA[i][j - 1].G + pA[i + 1][j - 1].G + pA[i + 2][j - 1].G + pA[i - 2][j].G + pA[i - 1][j].G + pA[i + 1][j].G + pA[i + 2][j].G + pA[i - 2][j + 1].G + pA[i - 1][j + 1].G + pA[i][j + 1].G + pA[i + 1][j + 1].G + pA[i + 2][j + 1].G + pA[i - 2][j + 2].G + pA[i - 1][j + 2].G + pA[i][j + 2].G + pA[i + 1][j + 2].G + pA[i + 2][j + 2].G) / 24);
                pA[i][j].B = Math.round((pA[i - 2][j - 2].B + pA[i - 1][j - 2].B + pA[i][j - 1].B + pA[i + 1][j - 2].B + pA[i + 2][j - 2].B + pA[i - 2][j - 1].B + pA[i - 1][j - 1].B + pA[i][j - 1].B + pA[i + 1][j - 1].B + pA[i + 2][j - 1].B + pA[i - 2][j].B + pA[i - 1][j].B + pA[i + 1][j].B + pA[i + 2][j].B + pA[i - 2][j + 1].B + pA[i - 1][j + 1].B + pA[i][j + 1].B + pA[i + 1][j + 1].B + pA[i + 2][j + 1].B + pA[i - 2][j + 2].B + pA[i - 1][j + 2].B + pA[i][j + 2].B + pA[i + 1][j + 2].B + pA[i + 2][j + 2].B) / 24);
            }
        }
    else //if (param == 3)
        for (i = 1; i < H - 1; i++) {
            for (j = 1; j < W - 1; j++) { 
                pA[i][j].R = Math.round((pA[i - 1][j].R + pA[i + 1][j].R + pA[i - 1][j - 1].R + pA[i][j - 1].R + pA[i + 1][j - 1].R + pA[i - 1][j + 1].R + pA[i][j + 1].R + pA[i - 1][j + 1].R) / 8);
                pA[i][j].G = Math.round((pA[i - 1][j].G + pA[i + 1][j].G + pA[i - 1][j - 1].G + pA[i][j - 1].G + pA[i + 1][j - 1].G + pA[i - 1][j + 1].G + pA[i][j + 1].G + pA[i - 1][j + 1].G) / 8);
                pA[i][j].B = Math.round((pA[i - 1][j].B + pA[i + 1][j].B + pA[i - 1][j - 1].B + pA[i][j - 1].B + pA[i + 1][j - 1].B + pA[i - 1][j + 1].B + pA[i][j + 1].B + pA[i - 1][j + 1].B) / 8);
            }
        }   
    
     
  
 
    //Упаковуємо 2Д масив R D G A в одномірний
    dataArray = set2dArrRGB(pA);
    //Замінюємо елементи у масиві пікселей imageData.data
    for (i = 0; i < data.length; i += 1) { data[i] = dataArray[i];   }
 
    // создаем или находим canvas
    var canvasTo = document.getElementById(canvastoId);
        canvasTo.width = canvas.width;
        canvasTo.height = canvas.height;
        canvasTo.style.width = canvas.style.width;
        canvasTo.style.height = canvas.style.height;
    // получаем его 2D контекст
    var contextTo = canvasTo.getContext('2d');
    //вставляємо imageData у context канваса
    contextTo.putImageData(imageData, 0, 0);


    /*
    image = new Image();
    image.src = canvas.toDataURL('image/png');
    
    // создаем или находим canvas
    var canvas = document.getElementById( canvastoId );
    // получаем его 2D контекст
    var context = canvas.getContext('2d');
    // кладем результат фильтрации обратно в canvas
    context.drawImage(image, 0, 0);
    */
}

this.rozmArrPixil = function( arr, param)
{
    var param = 1;
    if (arguments.length >= 2) param = arguments[1];

    var H = arr.length;
    var W = arr[0].length;

    var retArr = [];

    for (var i = 0; i < H ; i++) 
    {
        var rA = [];
        for (var n = 0; n < W; n++) 
        {
            
            var sumR = 0; var sumG = 0; var sumB = 0;
            var count = 0;
            for (var a = i-param; a <= i+param; a++) 
            {
                for (var b = n-param; b <= n+param; b++) 
                {
                    if ( a >=0 && b >=0 && a < H && b < W)
                    {
                        sumR += arr[a][b].R;
                        sumG += arr[a][b].G;
                        sumB += arr[a][b].B;

                        count++;
                    }
                }
            }

            var RGB = {};
            RGB.R = Math.round( (sumR + 1)  / count );
            RGB.G = Math.round( (sumG + 1) / count );
            RGB.B = Math.round( (sumB + 1) / count );
            RGB.A = arr[i][n].A ;

            rA[n] = RGB;

        }
        retArr[i] = rA;
    }

    return retArr;
}

 //--
//функція бінаризації
function binarize(canvas_id, canvastoId )
{
    var metod = 1;
    if (arguments.length == 3) metod = arguments[2];

    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");
    //отримання значeнь RGBa   Всіх пікселів
    var imageData = ctx.getImageData(0, 0, canvas.width , canvas.height );
    var data = imageData.data;
    var count = data.length; // canvas.width * canvas.height ;


    //визначення прогу, в залежності від обраного методу
    var porog = 128;
    var max = 0; min = 255;
    if (metod == 1) porog = 128;
    if (metod == 2) {
        for (var i = 0; i < count; i += 4) {
            var R = data[i];
            var G = data[i + 1];
            var B = data[i + 2];
            var A = data[i + 3];
            var seredne = (R + B + G) / 3;

            if (seredne > max) max = seredne;
            if (seredne < min) min = seredne;
        }
        porog = min + (max - min) / 2;
    }
    else if (metod == 3) {
        for (var i = 1; i < 255 ; i += 1) {
            var Wite = 0, Dark = 0;
            for (var n = 0; n < count ; n += 4) {
                var R = data[i];
                var G = data[i + 1];
                var B = data[i + 2];
                var seredne = (R + B + G) / 3;

                if (seredne <= i) Wite++; else Dark++;
            }

            if (Wite > Dark) {
                porog = i;
                break;
            }
        }
    }
    //Заміна пікселей
    for (var i = 0; i < count ; i += 4) {
        var R = data[i];
        var G = data[i + 1];
        var B = data[i + 2];
        var A = data[i + 3];
        var seredne = (R + B + G) / 3;

        if (seredne > porog) { data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; }
        else { data[i] = 0; data[i + 1] = 0; data[i + 2] = 0; }
    }

 
    var canvasTo = document.getElementById(canvastoId);
        canvasTo.width = canvas.width;
        canvasTo.height = canvas.height;
        canvasTo.style.width = canvas.style.width;
        canvasTo.style.height = canvas.style.height;
    // получаем его 2D контекст
    var contextTo = canvasTo.getContext('2d');
    //вставляємо imageData у context канваса
    contextTo.putImageData(imageData, 0, 0);

}

this.binarizeArray = function(arr,porog)
{
    var retArr = [];var count1 =0;

    for (var i = 0; i < arr.length; i++) 
    {
        var rA = [];
        for (var n = 0; n < arr[i].length; n++) 
        {
            if( (arr[i][n].R + arr[i][n].G + arr[i][n].B ) / 3 > porog )
            {
                rA[n] = 1;
            }
            else  rA[n] = 0;
        }

        retArr[i] = rA;
    }


    return retArr;
}


//++
//функція перетворення зображення у відтінки сірого
//вхідні параметри:
//canvasId  та canvastoId - айді вхідного та вихідного канвасу
//metod (3-ий параметр(не обовязково) ) - описує метод перетворення зображення
//та приймає наступні значеня: averaging (усереднення) - за замовчуванням, coefficients, sepia.
this.inShadesOfGray = function (canvasId, canvastoId)
{
    var metod = "averaging";
    if (arguments.length == 3) metod = arguments[2];

    //находим canvas
    var canvas = document.getElementById(canvasId);
    //ширина і висота канваса(зображення)
    var W = canvas.width;
    var H = canvas.height;
    // получаем его 2D контекст
    var context = canvas.getContext('2d');
    // получаем объект, описывающий внутреннее состояние области контекста
    var imageData = context.getImageData(0, 0, W, H);
    var data = imageData.data;

    //фільтрація
    if (metod == "averaging")
        for (i = 0; i < data.length; i += 4) {
            sredn = Math.round((data[i] + data[i + 1] + data[i + 2]) / 3);

            data[i] = sredn;
            data[i + 1] = sredn;
            data[i + 2] = sredn;
        }
    else if (metod == "coefficients")
        for (i = 0; i < data.length; i+= 4){
            sredn = Math.round(  data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722 );

            data[i] = sredn;
            data[i+1] = sredn;
            data[i + 2] = sredn;
        }
    else if (metod == "sepia") 
        for (i = 0; i < data.length; i += 4) {
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            data[i] = Math.round((r * 0.393) + (g * 0.769) + (b * 0.189)); // red
            data[i + 1] = Math.round((r * 0.349) + (g * 0.686) + (b * 0.168)); // green
            data[i + 2] = Math.round((r * 0.272) + (g * 0.534) + (b * 0.131)); // blue
        }
    

    // создаем или находим canvas
    var canvasTo = document.getElementById(canvastoId);
        canvasTo.width = canvas.width;
        canvasTo.height = canvas.height;
        canvasTo.style.width = canvas.style.width;
        canvasTo.style.height = canvas.style.height;
    // получаем его 2D контекст
    var contextTo = canvasTo.getContext('2d');
    //вставляємо imageData у context канваса
    contextTo.putImageData(imageData, 0, 0);
}


//Сегментація зображення - виділення букв та їхнього розміщення
this.segmentation = function (canvasId, canvastoId)
{
    //var operation = "retArr"; //retArr, showOnCanv
    var metod = "grille";
    if (arguments.length == 3) metod = arguments[2];

    //находим canvas
    var canvas = document.getElementById(canvasId);
    //ширина і висота канваса(зображення)
    var W = canvas.width; 
    var H = canvas.height; 
    // получаем его 2D контекст
    var context = canvas.getContext('2d');
    // получаем объект, описывающий внутреннее состояние области контекста
    var imageData = context.getImageData(0, 0, W, H);
    var data = imageData.data;  

    //розпаковуємо одномірний масив R D G A в 2Д масив  R D G A
    var pA = getRGB2dArr(data, W, H);

 
    //масив, що зберігатиме координати кожного знайденого обєкту
    var findObjects = [] 
    //в залежності від методу шукаємо обєкти
    if (metod == "grille")
    {
        findObjects = segmentationArrayGrille(pA);

        /*for (i = 0; i < findObjects.length; i++)
        {
            document.write("Строка №" + i + "<br>");
            for (n = 0; n < findObjects[i].length; n++)
            {
                document.write("№" + n + "(T:" + findObjects[i][n].top + ",B:" + findObjects[i][n].bottom + ",L:" + findObjects[i][n].left + ",R:" + findObjects[i][n].right + ") ");
            }
            document.write("<br>");
        }*/

 
        //намалювать рамки навколо знайдених символів
        for (i = 0; i < findObjects.length; i++) {
             
            for (n = 0; n < findObjects[i].length; n++) {

                for (var z = 0; z <  findObjects[i][n].length; z++) 
                {
                   

                    MYtop = findObjects[i][n][z].top;
                    MYleft = findObjects[i][n][z].left;
                    MYbottom = findObjects[i][n][z].bottom;
                    MYright = findObjects[i][n][z].right;
                    /*MYtop = findObjects[i][n][z].top-1;
                    MYleft = findObjects[i][n][z].left-1;
                    MYbottom = findObjects[i][n][z].bottom+1;
                    MYright = findObjects[i][n][z].right+1;*/
                    
                    //document.write("top=" + MYtop + " MYleft=" + MYleft + " MYbottom=" + MYbottom + " MYright=" + MYright + "<br>");
                    for (m = MYtop; m <= MYbottom; m++) { pA[m][MYleft].R = 255; pA[m][MYleft].G = 0; pA[m][MYleft].B = 0; }
                    for (m = MYtop; m <= MYbottom; m++) { pA[m][MYright].R = 255; pA[m][MYright].G = 0; pA[m][MYright].B = 0; }
                    for (m = MYleft; m <= MYright; m++) { pA[MYtop][m].R = 255; pA[MYtop][m].G = 0; pA[MYtop][m].B = 0; }
                    for (m = MYleft; m <= MYright; m++) { pA[MYbottom][m].R = 255; pA[MYbottom][m].G = 0; pA[MYbottom][m].B = 0; }
               
                }
            }
             
        }
    }
    else if (metod == "pixelscan")
    {

        findObjects = segmentationArrayPixelscan(pA);
        
        for (i = 0; i < findObjects.length; i++) {
            MYtop = findObjects[i].top;
            MYleft = findObjects[i].left;
            MYbottom = findObjects[i].bottom;
            MYright = findObjects[i].right;

            /*for (m = MYtop-1; m <= MYbottom+1; m++) { pA[m][MYleft-1].R = 255; pA[m][MYleft-1].G = 0; pA[m][MYleft-1].B = 0; }
            for (m = MYtop-1; m <= MYbottom+1; m++) { pA[m][MYright+1].R = 255; pA[m][MYright+1].G = 0; pA[m][MYright+1].B = 0; }
            for (m = MYleft-1; m <= MYright+1; m++) { pA[MYtop-1][m].R = 255; pA[MYtop-1][m].G = 0; pA[MYtop-1][m].B = 0; }
            for (m = MYleft-1; m <= MYright+1; m++) { pA[MYbottom+1][m].R = 255; pA[MYbottom+1][m].G = 0; pA[MYbottom+1][m].B = 0; }
*/
            for (m = MYtop; m <= MYbottom; m++) { pA[m][MYleft].R = 255; pA[m][MYleft].G = 0; pA[m][MYleft].B = 0; }
            for (m = MYtop; m <= MYbottom; m++) { pA[m][MYright].R = 255; pA[m][MYright].G = 0; pA[m][MYright].B = 0; }
            for (m = MYleft; m <= MYright; m++) { pA[MYtop][m].R = 255; pA[MYtop][m].G = 0; pA[MYtop][m].B = 0; }
            for (m = MYleft; m <= MYright; m++) { pA[MYbottom][m].R = 255; pA[MYbottom][m].G = 0; pA[MYbottom][m].B = 0; }

            
            //перебор пікселей обєкту
            /*for (n = 0; n < findObjects[i].obg.length; n++) {
                //findObjects[i].obg[n].X;
                //findObjects[i].obg[n].Y;
            }*/
        }

    }
    //pA[1][1].R = 255;
    //pA[1][1].G = 0;
    //pA[1][1].B = 0;

    //Упаковуємо 2Д масив R D G A в одномірний
    dataArray = set2dArrRGB(pA);
    //Замінюємо елементи у масиві пікселей imageData.data
    for (i = 0; i < data.length; i += 1) { data[i] = dataArray[i]; }

    // создаем или находим canvas
    var canvasTo = document.getElementById(canvastoId);
        canvasTo.width = canvas.width;
        canvasTo.height = canvas.height;
        canvasTo.style.width = canvas.style.width;
        canvasTo.style.height = canvas.style.height;
    // получаем его 2D контекст
    var contextTo = canvasTo.getContext('2d');
    //вставляємо imageData у context канваса
    contextTo.putImageData(imageData, 0, 0);
}



//++
//Ресайз зображення
//вхідні параметри:
//canvasId  та canvastoId - айді вхідного та вихідного канвасу
//width i height - бажані розміри зображення
//resize_canvas_style - true,false - чи приводити канвас до заданих розмірів(стиль)
this.resample_single = function (canvasId, canvastoId, width, height,resize_canvas_style ) 
{
    var canvas = document.getElementById( canvasId );
    var width_source = canvas.width;
    var height_source = canvas.height;
    width = Math.round(width);
    height = Math.round(height);

    var ratio_w = width_source / width;
    var ratio_h = height_source / height;
    var ratio_w_half = Math.ceil(ratio_w / 2);
    var ratio_h_half = Math.ceil(ratio_h / 2);

    var ctx = canvas.getContext("2d");
    var img = ctx.getImageData(0, 0, width_source, height_source);
    var img2 = ctx.createImageData(width, height);
    var data = img.data;
    var data2 = img2.data;

    for (var j = 0; j < height; j++) {
        for (var i = 0; i < width; i++) {
            var x2 = (i + j * width) * 4;
            var weight = 0;
            var weights = 0;
            var weights_alpha = 0;
            var gx_r = 0;
            var gx_g = 0;
            var gx_b = 0;
            var gx_a = 0;
            var center_y = (j + 0.5) * ratio_h;
            var yy_start = Math.floor(j * ratio_h);
            var yy_stop = Math.ceil((j + 1) * ratio_h);
            for (var yy = yy_start; yy < yy_stop; yy++) {
                var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                var center_x = (i + 0.5) * ratio_w;
                var w0 = dy * dy; //pre-calc part of w
                var xx_start = Math.floor(i * ratio_w);
                var xx_stop = Math.ceil((i + 1) * ratio_w);
                for (var xx = xx_start; xx < xx_stop; xx++) {
                    var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                    var w = Math.sqrt(w0 + dx * dx);
                    if (w >= 1) {
                        //pixel too far
                        continue;
                    }
                    //hermite filter
                    weight = 2 * w * w * w - 3 * w * w + 1;
                    var pos_x = 4 * (xx + yy * width_source);
                    //alpha
                    gx_a += weight * data[pos_x + 3];
                    weights_alpha += weight;
                    //colors
                    if (data[pos_x + 3] < 255)
                        weight = weight * data[pos_x + 3] / 250;
                    gx_r += weight * data[pos_x];
                    gx_g += weight * data[pos_x + 1];
                    gx_b += weight * data[pos_x + 2];
                    weights += weight;
                }
            }
            data2[x2] = gx_r / weights;
            data2[x2 + 1] = gx_g / weights;
            data2[x2 + 2] = gx_b / weights;
            data2[x2 + 3] = gx_a / weights_alpha;
        }
    }
   
    // создаем или находим canvas
    var canvasTo = document.getElementById(canvastoId);   
     
    canvasTo.width = width;
    canvasTo.height = height;   
    if ( resize_canvas_style === true)
    {
        canvasTo.style.width = width;
        canvasTo.style.height = height;
    }else{
        canvasTo.style.width = canvas.style.width;
        canvasTo.style.height = canvas.style.height;
    }
    // получаем его 2D контекст
    var contextTo = canvasTo.getContext('2d');
    //вставляємо imageData у context канваса
    contextTo.putImageData(img2, 0, 0);
}


this.resampleSingleArr = function(arr, width, height)
{   
    var height_source = 0;
    var width_source = 0;
    try
    { 
    height_source = arr.length;
    width_source = arr[0].length;
    }
    catch( e ) {
        ar2 = ["255"]; 
        arr = [ ar2 ];  
        height_source = 1;
        width_source = 1;
    }

    width = Math.round(width);
    height = Math.round(height);

    var ratio_w = width_source / width;
    var ratio_h = height_source / height;
    var ratio_w_half = Math.ceil(ratio_w / 2);
    var ratio_h_half = Math.ceil(ratio_h / 2);


    var data = []; var count = 0;
    for (var i = 0; i < height_source; i++) {
        for (var n = 0; n < width_source; n++) 
        {
            data[count] = arr[i][n].R;
            data[count+1] = arr[i][n].G;
            data[count+2] = arr[i][n].B;
            data[count+3] = arr[i][n].A;
            count+=4;
        }
    } 
    var data2 = [];
    for (var i = 0; i <  width *  height * 4; i++) data2[i] = "0";

    for (var j = 0; j < height; j++) {
        for (var i = 0; i < width; i++) {
            var x2 = (i + j * width) * 4;
            var weight = 0;
            var weights = 0;
            var weights_alpha = 0;
            var gx_r = 0;
            var gx_g = 0;
            var gx_b = 0;
            var gx_a = 0;
            var center_y = (j + 0.5) * ratio_h;
            var yy_start = Math.floor(j * ratio_h);
            var yy_stop = Math.ceil((j + 1) * ratio_h);
            for (var yy = yy_start; yy < yy_stop; yy++) {
                var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                var center_x = (i + 0.5) * ratio_w;
                var w0 = dy * dy; //pre-calc part of w
                var xx_start = Math.floor(i * ratio_w);
                var xx_stop = Math.ceil((i + 1) * ratio_w);
                for (var xx = xx_start; xx < xx_stop; xx++) {
                    var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                    var w = Math.sqrt(w0 + dx * dx);
                    if (w >= 1) {
                        //pixel too far
                        continue;
                    }
                    //hermite filter
                    weight = 2 * w * w * w - 3 * w * w + 1;
                    var pos_x = 4 * (xx + yy * width_source);
                    //alpha
                    gx_a += weight * data[pos_x + 3];
                    weights_alpha += weight;
                    //colors
                    if (data[pos_x + 3] < 255)
                        weight = weight * data[pos_x + 3] / 250;
                    gx_r += weight * data[pos_x];
                    gx_g += weight * data[pos_x + 1];
                    gx_b += weight * data[pos_x + 2];
                    weights += weight;
                }
            }
            data2[x2] = Math.round( gx_r / weights);
            data2[x2 + 1] = Math.round( gx_g / weights);
            data2[x2 + 2] = Math.round( gx_b / weights );
            data2[x2 + 3] = Math.round( gx_a / weights_alpha );
        }
    }

    return getRGB2dArr(data2,width,height);
}






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////Інші функції////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//--
//функція Спесія - червонувато-коричневий колір, пов'язаний, зокрема, з монохромними фотографіями 19-го і початку 20-го століття.
this.sepia2 = function (imageData) {
    // получаем одномерный массив, описывающий все пиксели изображения
    var pixels = imageData.data;
    // циклически преобразуем массив, изменяя значения красного, зеленого и синего каналов
    for (var i = 0; i < pixels.length; i += 4) {
        var r = pixels[i];
        var g = pixels[i + 1];
        var b = pixels[i + 2];
        pixels[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // red
        pixels[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // green
        pixels[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // blue
    }
    return imageData;
}










































    /*
    rozmColorImg(canvasId, "canvas1", 3);  
    rozmColorImg(canvasId, "canvas2", 5); 
    rozmColorImg(canvasId, "canvas3", 7);  
    rozmColorImg(canvasId, canvasId, 1);  
    
    binarize(canvasId, "canvas1", 1);
    binarize(canvasId, "canvas2", 2);
    binarize(canvasId, "canvas3", 3);
    */

    /*
    inShadesOfGray(canvasId, "canvas1");
    inShadesOfGray(canvasId, "canvas2", "ololo");
    inShadesOfGray(canvasId, "canvas3", "averaging");
    inShadesOfGray(canvasId, "canvas4", "coefficients");
    inShadesOfGray(canvasId, "canvas5", "sepia");
    */

    /*
    blurryColorImg(canvasId, "canvas1", 0, "averaging");
    blurryColorImg(canvasId, "canvas2", 1, "averaging");
    blurryColorImg(canvasId, "canvas3", 2, "averaging");
    blurryColorImg(canvasId, "canvas4", 3, "averaging");
    blurryColorImg(canvasId, "canvas5", 4, "averaging");
    blurryColorImg(canvasId, "canvas6", 5, "averaging");
    */