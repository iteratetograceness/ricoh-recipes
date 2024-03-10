const Replicate = require("replicate");

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
});

const version = '38e5c1f974ad8d17eaeed923fd1925f3644171ddd578a0831587e196b434a233';

async function trainModel() {
    await replicate.trainings.create('yorickvp', 'llava-13b', version, {
        destination: 'jueungrace/ricoh-llava-13b',
        input: {
            "train_data": process.env.TRAIN_DATA
        },
    });
}

trainModel().catch(console.error);