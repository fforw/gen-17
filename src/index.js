import domready from "domready"
import "./style.css"
import Color from "./Color";

const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;
const DEG2RAD_FACTOR = TAU / 360;

const config = {
    width: 0,
    height: 0
};

/**
 * @type CanvasRenderingContext2D
 */
let ctx;
let canvas;

function norm(number)
{
    const n = number - (number | 0);
    return n < 0 ? 1 + n : n;
}

const harmonicOffsets = [0.5, 1/3, 2/3, 1/6, 5/6]

function paintCircle()
{
    const { width, height } = config

    const size = Math.min(width,height)/2;

    const rnd = Math.random();
    const r = 0 | (rnd * rnd * rnd * size / 2 + size / 2)
    const a = TAU * Math.random();

    const x = 0|(size/2 + Math.random() * ( width - size) )
    const y = 0|(size/2 + Math.random() * ( height - size) )

    const ca = Math.cos(a) * r;
    const sa = Math.sin(a) * r;
    const gradient = ctx.createLinearGradient(
    x + ca,
    y + sa,
    x - ca,
    y - sa
    )
    const hue = Math.random();
    gradient.addColorStop(
        0,
        Color.fromHSL(hue, 1, 0.5).toRGBA(0.7)
    )



    gradient.addColorStop(
        0.61,
        Color.fromHSL(norm(hue + harmonicOffsets[0|harmonicOffsets.length * Math.random()]), 1, 0.5).toRGBA(0.0)
    )

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x,y,r, 0, TAU, true)
    ctx.fill()

}




domready(
    () => {

        canvas = document.getElementById("screen");
        ctx = canvas.getContext("2d");

        const width = (window.innerWidth) | 0;
        const height = (window.innerHeight) | 0;

        config.width = width;
        config.height = height;


        canvas.width = width;
        canvas.height = height;


        const paint = () => {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, width, height);

            const num = 4 + Math.random() * 5;

            for (let i = 0; i < num; i++)
            {
                paintCircle()
            }
        };


        paint();

        window.addEventListener("click", paint, true)
    }
);
