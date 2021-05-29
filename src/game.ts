// Base scene
const baseScene = new Entity();
baseScene.addComponent(new GLTFShape('models/baseScene.glb'));
baseScene.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0)
  })
);
engine.addEntity(baseScene);

// Ape Display
const nftUri = 'ethereum://0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/3871';
const apeNft = new Entity();
apeNft.addComponent(new NFTShape(nftUri));
apeNft.addComponent(
  new Transform({
    position: new Vector3(8, 2.5, 8),
    scale: new Vector3(6, 6, 6)
  })
);
apeNft.addComponent(
  new OnPointerDown(
    () => {
      openNFTDialog(nftUri);
    },
    { showFeedback: false }
  )
);
engine.addEntity(apeNft);
