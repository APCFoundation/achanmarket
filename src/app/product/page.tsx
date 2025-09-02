"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import useRefProduct from "@/hook/useRefProduct";
import Matter from "matter-js";
gsap.registerPlugin(ScrollTrigger, useGSAP);
const Page = () => {
  const inititalPath = `M 0 80 Q 80 80 1080 80`;
  let currentPath = `M 0 80 Q 80 80 1080 80`;
  const { container, containerRef, svgRef } = useRefProduct();
  const { contextSafe } = useGSAP({ scope: container });
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseLeave: React.MouseEventHandler<SVGSVGElement> = contextSafe(() => {
    gsap.to("svg path", {
      attr: { d: inititalPath },
      ease: "elastic.out(1,0.2)",
      duration: 1,
    });
  });
  const mouseMove: React.MouseEventHandler = contextSafe((e) => {
    const x = e.clientX; // X position relative to the viewport
    const top = svgRef.current?.getBoundingClientRect().top || 0; // Distance of the element from the top of the viewport
    let y = Math.ceil(e.clientY - top); // Y position relative to the viewport minus the top offset
    y = Math.abs(y); // Ensure the value is positive\

    currentPath = `M 0 80 Q ${x} ${y} 1080 80`;
    gsap.to("svg path", {
      attr: { d: currentPath },
      duration: 0.3,
    });
  });

  useGSAP(() => {
    const sections = gsap.utils.toArray(".panel");
    console.log(
      containerRef.current?.offsetWidth + " : offset width \n",
      containerRef.current?.clientWidth + " : cleint width \n",
      containerRef.current?.getBoundingClientRect().width + " rect widtrh \n"
    );
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#section-2",
        pin: true,
        markers: true,
        scrub: 1,
        start: "top top",
        snap: 1 / (sections.length - 1),
        end: () => "+=" + containerRef.current?.offsetWidth,
      },
    });

    gsap.from(".box-1", {
      duration: 2,
      ease: "none",
      scrollTrigger: {
        trigger: ".box-1",
        start: "top top",
        scrub: 1,
        scroller: "body",
        end: "+=220px",
        pin: true,
        pinSpacing: false,
      },
    });
  });

  // useEffect(() => {
  //   // Inisialisasi engine dan world
  //   const engine = Matter.Engine.create();
  //   const world = engine.world;

  //   // Inisialisasi renderer
  //   const render = Matter.Render.create({
  //     element: sceneRef.current!,
  //     engine: engine,
  //     options: {
  //       width: 800,
  //       height: 400,
  //       wireframes: false,
  //       background: "#f0f0f0",
  //     },
  //   });

  //   // Membuat ground
  //   const ground = Matter.Bodies.rectangle(400, 390, 800, 20, {
  //     isStatic: true,
  //     render: { fillStyle: "brown" },
  //   });

  //   // Membuat bola
  //   const ball = Matter.Bodies.circle(400, 100, 30, {
  //     restitution: 0.8, // Pantulan
  //     render: { fillStyle: "blue" },
  //   });

  //   // Menambahkan objek ke dunia
  //   Matter.World.add(world, [ground, ball]);

  //   // Menjalankan engine dan render
  //   Matter.Engine.run(engine);
  //   Matter.Render.run(render);

  //   const handleClick = (event: MouseEvent) => {
  //     const newBall = Matter.Bodies.circle(event.clientX, event.clientY, 20, {
  //       restitution: 0.8,
  //       render: { fillStyle: "red" },
  //     });
  //     Matter.World.add(world, newBall);
  //   };

  //   window.addEventListener("click", handleClick);

  //   return () => {
  //     // Membersihkan Matter.js saat komponen unmount
  //     Matter.Render.stop(render);
  //     Matter.World.clear(world, false);
  //     Matter.Engine.clear(engine);
  //     window.removeEventListener("click", handleClick);
  //   };
  // }, []);

  useEffect(() => {
    let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse;

    // create engine
    let engine = Engine.create();
    // create renderer
    let render = Render.create({
      engine: engine,
      canvas: canvasRef.current!,
      options: {
        width: 1024,
        height: 600,
      },
    });
    // create two box and a ground
    let boxA = Bodies.rectangle(400, 200, 100, 80);
    let boxB = Bodies.rectangle(450, 50, 80, 80);
    let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    const ball = Matter.Bodies.circle(400, 100, 90, {
      restitution: 0.8, // Pantulan
      render: {
        sprite: {
          texture: "/circle.png", // Ganti dengan path gambar kamu
          xScale: 0.6, // Skalanya harus sesuai dengan ukuran body
          yScale: 0.6,
        },
      },
    });

    // setting mouse
    let mouse = Mouse.create(render.canvas);
    let mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: {
          visible: true,
        },
      },
    });

    render.mouse = mouse;

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground, ball, mouseConstraint]);

    // run the renderer
    Render.run(render);
    // create runner
    let runner = Runner.create();
    // run the engine
    Runner.run(runner, engine);
  });
  return (
    <div className=" ">
      <div className="w-full h-screen bg-black">
        <div className="w-full" ref={sceneRef}></div>
        <canvas className="mx-auto" ref={canvasRef}></canvas>
      </div>
      <div className="w-fulll h-screen flex justify-center items-center bg-blue-400">
        <div className="w-full  box-1 bg-black h-48 absolute" ref={container}>
          <svg
            ref={svgRef}
            width={"1080"}
            height={"192"}
            className=" m-auto"
            onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
          >
            <path
              d={`M 0,80 Q 80,80 1080,80`}
              stroke="white"
              fill="transparent"
            />
          </svg>
        </div>
      </div>
      <div
        ref={containerRef}
        id="section-2"
        className="whitespace-nowrap overflow-x-hidden"
      >
        <main id="section-3" className="flex w-fit h-fit">
          <section className="w-screen h-screen bg-red-400 flex justify-center items-center panel">
            <div id="box-2" className="w-full bg-black h-48"></div>
          </section>
          <section className="w-screen h-screen bg-green-400 flex justify-center items-center panel">
            <div className="flex mt-3 gap-2 flex-wrap mx-4 h-80 ">
              {Array(9)
                .fill("")
                .map((i, index) => (
                  <div
                    key={index}
                    className="card  w-20 h-24 relative group font-press text-[8px] "
                  >
                    <div className="back  text-nowrap absolute inset-0 bg-blue-500  flex justify-center items-center">
                      Click me
                    </div>
                    <div className=" front absolute size-full inset-0 bg-red-500 flex justify-center items-center  ">
                      Front
                    </div>
                  </div>
                ))}
            </div>
          </section>
          <section className="w-screen h-screen bg-orange-400 flex justify-center items-center panel"></section>
          <section className="w-screen h-screen bg-blue-400 flex justify-center items-center panel">
            <h1 className="text-8xl">FOUR</h1>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
