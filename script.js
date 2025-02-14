document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const video = document.getElementById('videoPlayer');
    const thumbnail = document.getElementById('thumbnail');
    const player = new Plyr(video);

    // Initialize Slick Carousel
    $('.carousel').slick({
        infinite: true,
        slidesToShow: 12,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev">Anterior</button>',
        nextArrow: '<button type="button" class="slick-next">Próximo</button>',
    });

    carouselItems.forEach(item => {
        item.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            loadChannel(url);
            thumbnail.style.display = 'none'; // Hide the thumbnail when a video is loaded
        });
    });

    thumbnail.addEventListener('click', function() {
        video.play();
        thumbnail.style.display = 'none'; // Hide the thumbnail when the video is played
    });

    function loadChannel(url) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
            hls.on(Hls.Events.ERROR, function(event, data) {
                console.error('Hls.js error:', data);
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        } else {
            alert('Seu navegador não suporta HLS.');
        }
    }
const defaultUrl = 'https://cdn.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8'; // URL de exemplo. Substitua pelo seu URL M3U8.
    loadChannel(defaultUrl);
});