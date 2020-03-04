document.body.style.padding = 0;
document.body.style.margin = 0;
document.body.style.background = '#000';

var splashScreen = document.createElement('div');

var themeSong = document.createElement('audio');
themeSong.src = 'assets/mc_bg_theme_song.mp3';
themeSong.volume = '0.1';
themeSong.autoplay = true;
themeSong.loop = true;

var startButtonHoverSound = document.createElement('audio');
startButtonHoverSound.src = 'assets/start_button_hover_sound.mp3';
startButtonHoverSound.volume = '0.3';

var startButtonClickSound = document.createElement('audio');
startButtonClickSound.src = 'assets/start_button_click_sound.mp3';
startButtonClickSound.volume = '0.5';

var mainMenu = document.createElement('div');
mainMenu.setAttribute('id', 'mainMenu');
mainMenu.style.width = '100vw';
mainMenu.style.height = '100vh';
mainMenu.style.background = '#000 url(assets/bg_main_menu.png) center center no-repeat';
mainMenu.style.backgroundAttachment = 'fixed';
mainMenu.style.backgroundSize = '100% auto';
mainMenu.style.color = '#fff';
mainMenu.style.position = 'relative';
mainMenu.style.display = 'block';

var mainTitle = document.createElement('p');
mainTitle.innerHTML = 'The Beginning';
mainTitle.style.color = '#ccc';
mainTitle.style.textShadow = '2px 2px 5px #000, -2px -2px 5px #000';
mainTitle.style.position = 'absolute';
mainTitle.style.top = 'calc(50vh - 300px)';
mainTitle.style.fontStyle = 'italic';
mainTitle.style.left = 'calc(50vw - 205px)';
mainTitle.style.fontSize = '50pt';

var startButton = document.createElement('p');
startButton.innerHTML = 'START';
startButton.style.width = '100px';
startButton.style.height = '50px';
startButton.style.color = 'black';
startButton.style.textShadow = '2px 2px 5px #000, -2px -2px 5px #000';
startButton.style.position = 'absolute';
startButton.style.top = 'calc(50vh + 100px)';
startButton.style.left = 'calc(50vw - 50px)';
startButton.style.fontSize = '20pt';
startButton.style.cursor = 'pointer';

var canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.background = 'black';
canvas.style.display = 'none';

startButton.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

startButton.addEventListener('mouseover', function(e) {
    startButton.style.textShadow = '1px 1px 1px #ff0000, -1px -1px 1px #0000ff, 5px 5px 5px #00ff00';
    startButton.style.color = '#ff000000';
    startButtonHoverSound.play();

});

startButton.addEventListener('mouseout', function(e) {
    startButton.style.textShadow = null;
    startButton.style.color = 'black';
    startButton.style.textShadow = '2px 2px 5px #000, -2px -2px 5px #000';
});

startButton.addEventListener('click', function(e) {
    startButtonClickSound.play();
    openFullscreen();
    showSplashScreen();
    setTimeout(function() {
        clearScreen();
        startScene();
    }, 3500);
});

mainMenu.appendChild(themeSong);
mainMenu.appendChild(startButtonHoverSound);
mainMenu.appendChild(startButtonClickSound);
mainMenu.appendChild(mainTitle);
mainMenu.appendChild(startButton);
document.body.appendChild(mainMenu);
document.body.appendChild(canvas);

function showSplashScreen() {
    splashS = splashScreen.style;
    splashS.width = '100vw';
    splashS.height = '100vh';

    var loadingText = document.createElement('p');
    loadingText.innerHTML = 'Now Loading...';
    loadingS = loadingText.style;
    loadingS.color = 'white';
    loadingS.fontSize = '30pt';
    loadingS.fontStyle = 'bold';
    loadingS.position = 'fixed';
    loadingS.top = 'calc(50vh - 70px)';
    loadingS.left = 'calc(50vw - 130px)';

    splashScreen.appendChild(loadingText);
    document.body.appendChild(splashScreen);
}

function clearScreen() {
    splashScreen.style.display = 'none';
    canvas.style.display = 'block';
}

// window.addEventListener('DOMContentLoaded', domContentLoaded());

function startScene() {
    var canvas = document.getElementById('canvas');

    if (canvas.style.display == 'none') {
        return;
    } else {
        var engine = new BABYLON.Engine(canvas, true);
        var createScene = function() {
            var scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color3.White();
            var box = BABYLON.Mesh.CreateBox('box', 4.0, scene);
            var box2 = BABYLON.Mesh.CreateBox("Box2", 4.0, scene);
            var material = new BABYLON.StandardMaterial("material1", scene);
            material.wireframe = true;
            box2.material = material;

            box2.position = new BABYLON.Vector3(0, 3, 0);

            var camera = new BABYLON.FollowCamera("followCam", new BABYLON.Vector3(-6, 50, 10), scene);
            camera.lockedTarget = box;
            camera.radius = 10;
            camera.heightOffset = 0;
            camera.attachControl(canvas, true);

            scene.activeCamera = camera;
            return scene;
        }
        var scene = createScene();
        themeSong.volume = '0.2';
        engine.runRenderLoop(function() {
            scene.render();
        });
    }
}

function openFullscreen() {
    mainMenu.style.display = 'none';
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { /* Firefox */
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE/Edge */
        canvas.msRequestFullscreen();
    }
}