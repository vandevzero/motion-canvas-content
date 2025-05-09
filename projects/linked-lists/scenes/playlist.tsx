import { Icon, Layout, makeScene2D, Rect } from "@motion-canvas/2d";
import { Background } from "../../../lib/components/background";
import { all, beginSlide, createRef, createRefArray, range, sequence, waitFor } from "@motion-canvas/core";
import { BLUE, CRUST, GREEN, RED, SURFACE0, SURFACE1, SURFACE2, TEXT } from "../../../lib/styles/colors";

export default makeScene2D(function*(view) {
  let container = createRef<Layout>();
  let songs = createRefArray<Rect>();
  let playing = 2;
  let player = createRef<Rect>();

  view.add(
    <>
      <Background />

      <Layout ref={container} layout direction={"column"} alignItems={"center"}>
        {range(5).map((i) => {
          return <Rect
            ref={songs}
            fill={SURFACE0}
            stroke={i == playing ? BLUE : SURFACE1}
            lineWidth={i == playing ? 6 : 4}
            padding={[20, 30, 20, 20]}
            radius={10}
            opacity={0}
            scale={0}
            gap={20}
            alignItems={"center"}
            shadowBlur={20}
            shadowColor={CRUST}
          >
            <Rect padding={20} fill={SURFACE1} radius={10}>
              <Icon
                icon={"mynaui:music-solid"}
                color={TEXT}
                height={50}
              />
            </Rect>

            <Icon
              icon={i == playing ? "material-symbols:pause-rounded" : "material-symbols:play-arrow-rounded"}
              color={i == playing ? TEXT : TEXT}
              height={80}
            />

            <Layout layout direction={"column"} gap={20}>
              <Rect width={500} height={20} fill={SURFACE2} radius={10} />
              <Rect width={200} height={20} fill={SURFACE1} radius={10} />
            </Layout>
          </Rect>;
        })}

        <Rect
          layout
          ref={player}
          fill={SURFACE0}
          stroke={SURFACE1}
          lineWidth={4}
          height={100}
          radius={50}
          padding={30}
          alignItems={"center"}
          gap={20}
          marginTop={40}
          opacity={0}
          scale={0}
          shadowBlur={20}
          shadowColor={CRUST}
        >
          <Icon
            icon={"material-symbols:skip-previous-rounded"}
            color={TEXT}
            height={70}
          />

          <Icon
            icon={"material-symbols:pause-rounded"}
            color={TEXT}
            height={70}
          />

          <Icon
            icon={"material-symbols:skip-next-rounded"}
            color={TEXT}
            height={70}
          />
        </Rect>
      </Layout>
    </>
  );

  yield* sequence(
    0.1,
    ...songs.map((song, _) => all(
      song.opacity(1, 0.5),
      song.scale(1, 0.5),
      song.margin([20, 0, 0, 0], 0.5),
    )),
    all(
      player().opacity(1, 0.5),
      player().scale(1, 0.5),
    )
  );

  yield* beginSlide("48");

  yield* all(
    container().scale(0, 0.5),
    container().opacity(0, 0.5),
  );
});
