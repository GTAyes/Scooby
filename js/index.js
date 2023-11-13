var ibu_land = document.getElementById( "ibu-land" );
var ibu_captcha = document.getElementById( "ibu-captcha" );
var audio = document.getElementById( "ibu-audio" );

var type_writer_text = function( el, text, period ) 
{
    this.toRotate = text;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt( period, 10 ) || 2000;
    this.txt = "";
    this.tick( );
    this.isDeleting = false;
};

type_writer_text.prototype.tick = function( )
{
    var i = this.loopNum % this.toRotate.length;
    var full_txt = this.toRotate[ i ];

    if ( this.isDeleting )
        this.txt = full_txt.substring( 0, this.txt.length - 1 );
    else
        this.txt = full_txt.substring( 0, this.txt.length + 1 );

    this.el.innerHTML = "<span class='wrap'>" + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random( ) * 100;

    if ( this.isDeleting )
        delta /= 2;

    if ( !this.isDeleting && this.txt === full_txt )
    {
        delta = this.period;
        this.isDeleting = true;
    } 
    else if ( this.isDeleting && this.txt === "" )
    {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout( function( )
    {
        that.tick( );
    }, delta );
};

function ibu_enter( )
{
    var ibu_style = document.createElement( "style" );
    var pill_svg = document.getElementById( "pill-svg" );
    var pill_svg1 = document.getElementById( "pill-svg1" );
    var type_write_elements = document.getElementsByClassName( "type-write" );
    var audio_ctx = new ( window.AudioContext || window.webkitAudioContext )( )
    var audio_src = audio_ctx.createMediaElementSource( audio )
    var audio_analyser = audio_ctx.createAnalyser( );

    ibu_land.style.display = "block";
    ibu_captcha.style.display = "none";

    audio.play( );
    audio_src.connect( audio_analyser )
    audio_src.connect( audio_ctx.destination );
    audio_analyser.fftSize = 2048;

    var buffer_length = audio_analyser.frequencyBinCount;
    var data_array = new Uint8Array( buffer_length );

    audio_analyser.getByteTimeDomainData( data_array );

    function anim_frame( )
    {
        requestAnimationFrame( anim_frame );
        audio_analyser.getByteFrequencyData( data_array );

        var freq = data_array[ 3 ] * 2;

        pill_svg.width = freq;
        pill_svg1.width = freq;

        pill_svg.height = freq;
        pill_svg1.height = freq;
    };
    anim_frame( );

    for ( var i = 0; i < type_write_elements.length; i++ )
    {
        var txt_data = type_write_elements[ i ].getAttribute( "data-type" );
        var data_period = type_write_elements[ i ].getAttribute( "data-period" );

        if ( txt_data )
            new type_writer_text( type_write_elements[ i ], JSON.parse( txt_data ), data_period );
    }
    ibu_style.innerHTML = ".type-write > .wrap { border-right: 0.1em solid #ffffff }";
    document.body.appendChild( ibu_style );


    tsParticles.load( "logo-particles",
    {
        "particles": {
            "number": { "value": 20, "density": { "enable": true, "value_area": 450 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "image", "image": { "src": "dep/munch.png", "width": 100, "height": 100} },
            "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 30, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
            "move": { "enable": true, "speed": 2, "direction": "bottom", "random": false, "straight": false, "out_mode": "out", "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } },
        },
    });

    tsParticles.load( "stars", {"autoPlay":true,"background":{"color":{"value":"#000"},"image":"","position":"","repeat":"","size":"","opacity":1},"backgroundMask":{"composite":"destination-out","cover":{"color":{"value":"#fff"},"opacity":1},"enable":false},"fullScreen":{"enable":true,"zIndex":-1},"detectRetina":true,"duration":0,"fpsLimit":120,"interactivity":{"detectsOn":"window","events":{"onClick":{"enable":false,"mode":[]},"onDiv":{"selectors":[],"enable":false,"mode":[],"type":"circle"},"onHover":{"enable":false,"mode":[],"parallax":{"enable":false,"force":2,"smooth":10}},"resize":true},"modes":{"attract":{"distance":200,"duration":0.4,"easing":"ease-out-quad","factor":1,"maxSpeed":50,"speed":1},"bounce":{"distance":200},"bubble":{"distance":200,"duration":0.4,"mix":false,"divs":{"distance":200,"duration":0.4,"mix":false,"selectors":[]}},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":100,"links":{"blink":false,"consent":false,"opacity":1}},"push":{"default":true,"groups":[],"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4,"factor":100,"speed":1,"maxSpeed":50,"easing":"ease-out-quad","divs":{"distance":200,"duration":0.4,"factor":100,"speed":1,"maxSpeed":50,"easing":"ease-out-quad","selectors":[]}},"slow":{"factor":3,"radius":200},"trail":{"delay":1,"pauseOnStop":false,"quantity":1},"light":{"area":{"gradient":{"start":{"value":"#ffffff"},"stop":{"value":"#000000"}},"radius":1000},"shadow":{"color":{"value":"#000000"},"length":2000}}}},"manualParticles":[],"motion":{"disable":false,"reduce":{"factor":4,"value":true}},"particles":{"bounce":{"horizontal":{"random":{"enable":false,"minimumValue":0.1},"value":1},"vertical":{"random":{"enable":false,"minimumValue":0.1},"value":1}},"collisions":{"bounce":{"horizontal":{"random":{"enable":false,"minimumValue":0.1},"value":1},"vertical":{"random":{"enable":false,"minimumValue":0.1},"value":1}},"enable":false,"mode":"bounce","overlap":{"enable":true,"retries":0}},"color":{"value":"#fff","animation":{"h":{"count":0,"enable":false,"offset":0,"speed":1,"decay":0,"sync":true},"s":{"count":0,"enable":false,"offset":0,"speed":1,"decay":0,"sync":true},"l":{"count":0,"enable":false,"offset":0,"speed":1,"decay":0,"sync":true}}},"groups":{"z5000":{"number":{"value":70},"zIndex":{"value":50}},"z7500":{"number":{"value":30},"zIndex":{"value":75}},"z2500":{"number":{"value":50},"zIndex":{"value":25}},"z1000":{"number":{"value":40},"zIndex":{"value":10}}},"move":{"angle":{"offset":0,"value":90},"attract":{"distance":200,"enable":false,"rotate":{"x":3000,"y":3000}},"center":{"x":50,"y":50,"mode":"percent","radius":0},"decay":0,"distance":{},"direction":"none","drift":0,"enable":false,"gravity":{"acceleration":9.81,"enable":false,"inverse":false,"maxSpeed":50},"path":{"clamp":true,"delay":{"random":{"enable":false,"minimumValue":0},"value":0},"enable":false,"options":{}},"outModes":{"default":"out","bottom":"out","left":"out","right":"out","top":"out"},"random":false,"size":false,"speed":2,"spin":{"acceleration":0,"enable":false},"straight":false,"trail":{"enable":false,"length":10,"fillColor":{"value":"#000000"}},"vibrate":false,"warp":false},"number":{"density":{"enable":true,"area":800,"factor":1000},"limit":0,"value":200},"opacity":{"random":{"enable":false,"minimumValue":0.1},"value":{"min":0.1,"max":1},"animation":{"count":0,"enable":true,"speed":0.25,"decay":0,"sync":false,"destroy":"none","startValue":"random"}},"reduceDuplicates":false,"shadow":{"blur":0,"color":{"value":"#000"},"enable":false,"offset":{"x":0,"y":0}},"shape":{"options":{},"type":"circle"},"size":{"random":{"enable":false,"minimumValue":1},"value":1,"animation":{"count":0,"enable":false,"speed":5,"decay":0,"sync":false,"destroy":"none","startValue":"random"}},"stroke":{"width":0},"zIndex":{"random":{"enable":false,"minimumValue":0},"value":0,"opacityRate":1,"sizeRate":1,"velocityRate":1},"life":{"count":0,"delay":{"random":{"enable":false,"minimumValue":0},"value":0,"sync":false},"duration":{"random":{"enable":false,"minimumValue":0.0001},"value":0,"sync":false}},"rotate":{"random":{"enable":false,"minimumValue":0},"value":0,"animation":{"enable":false,"speed":0,"decay":0,"sync":false},"direction":"clockwise","path":false},"destroy":{"bounds":{},"mode":"none","split":{"count":1,"factor":{"random":{"enable":false,"minimumValue":0},"value":3},"rate":{"random":{"enable":false,"minimumValue":0},"value":{"min":4,"max":9}},"sizeOffset":true,"particles":{}}},"roll":{"darken":{"enable":false,"value":0},"enable":false,"enlighten":{"enable":false,"value":0},"mode":"vertical","speed":25},"tilt":{"random":{"enable":false,"minimumValue":0},"value":0,"animation":{"enable":false,"speed":0,"decay":0,"sync":false},"direction":"clockwise","enable":false},"twinkle":{"lines":{"enable":false,"frequency":0.05,"opacity":1},"particles":{"enable":false,"frequency":0.05,"opacity":1}},"wobble":{"distance":5,"enable":false,"speed":{"angle":50,"move":10}},"orbit":{"animation":{"count":0,"enable":false,"speed":1,"decay":0,"sync":false},"enable":false,"opacity":1,"rotation":{"random":{"enable":false,"minimumValue":0},"value":45},"width":1},"links":{"blink":false,"color":{"value":"#ffffff"},"consent":false,"distance":100,"enable":false,"frequency":1,"opacity":0.4,"shadow":{"blur":5,"color":{"value":"#000"},"enable":false},"triangles":{"enable":false,"frequency":1},"width":1,"warp":false},"repulse":{"random":{"enable":false,"minimumValue":0},"value":0,"enabled":false,"distance":1,"duration":1,"factor":1,"speed":1}},"pauseOnBlur":true,"pauseOnOutsideViewport":true,"responsive":[],"smooth":false,"style":{},"themes":[],"zLayers":100,"emitters":[]} );
}

window.onload = function( )
{
    ibu_land.style.display = "none";
    audio.setAttribute( "src", "dep/ofc.mp3" );
    audio.crossOrigin = "anonymous"
    audio.volume = 0.1;
    audio.pause( );
};