import React from "react";
import { FixedSizeGrid as Grid } from "react-window";

const Home = () => {
  const images = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    // ✅ working image source
    url: `https://picsum.photos/300/200?random=${index}`,
  }));

  const COLUMN_COUNT = 4;
  const IMAGE_WIDTH = 220;
  const IMAGE_HEIGHT = 220;
  const ROW_COUNT = Math.ceil(images.length / COLUMN_COUNT);

  return (
    <div style={{ padding: 20 }}>
      <Grid
        columnCount={COLUMN_COUNT}
        columnWidth={IMAGE_WIDTH}
        rowCount={ROW_COUNT}
        rowHeight={IMAGE_HEIGHT}
        width={900}
        height={600}
      >
        {({ columnIndex, rowIndex, style }) => {
          const imageIndex = rowIndex * COLUMN_COUNT + columnIndex;
          const image = images[imageIndex];

          if (!image) return null;

          return (
            <div style={style}>
              <img
                src={image.url}
                alt={`Image ${image.id}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          );
        }}
      </Grid>
    </div>
  );
};

export default Home;
