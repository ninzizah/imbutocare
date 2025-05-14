const imageUpload = document.getElementById("imageUpload");
const diagnoseButton = document.getElementById("diagnoseButton");
const resultDiv = document.getElementById("result");
const plantImage = document.getElementById("plantImage");
const plantNameSpan = document.getElementById("plantName");
const diseaseNameSpan = document.getElementById("diseaseName");
const confidenceSpan = document.getElementById("confidence");
const advicePre = document.getElementById("advice");
const medicinePre = document.getElementById("medicine");
const alternativesDiv = document.getElementById("alternatives");

let knowledgeBase = {};
let model = null;

// Corresponds to a typical PlantVillage dataset structure (38 classes)
// This order MUST match the output order of the TFLite model.
const PLANT_VILLAGE_CLASSES = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot", "Corn_(maize)___Common_rust_", "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy",
    "Grape___Black_rot", "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
    "Raspberry___healthy", "Soybean___healthy", "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites_Two-spotted_spider_mite", "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
];

// Model URL - Placeholder, replace with an actual PlantVillage TFLite model URL
// Example: A MobileNetV2 model fine-tuned on PlantVillage, converted to TFLite.
// For local testing, you might need to host this model file somewhere accessible (e.g., GitHub Pages, local server)
// Or, if a model is available on TF Hub in TFLite format directly usable by TFJS, that URL can be used.
// For now, we'll use a known TF Hub model URL for image classification as a placeholder to test loading.
// THIS IS NOT A PLANT DISEASE MODEL, JUST FOR TESTING TFLITE LOADING IN TFJS.
// const MODEL_URL = "https://tfhub.dev/tensorflow/lite-model/mobilenet_v2_1.0_224/1/metadata/1?lite-format=tflite";
// A more appropriate placeholder might be one from a known source if available, or we proceed with simulation if no direct URL is found for a PlantVillage TFLite model.
// For the purpose of this script, we will assume a model is loaded. The actual loading part is tricky without a stable, free, CORS-enabled TFLite PlantVillage model URL.
// We will keep the simulation logic for now and clearly state that real model integration is the next step for the user if they provide a model or if one is found.

async function loadModelAndKnowledgeBase() {
    try {
        // Load Knowledge Base
        const kbResponse = await fetch("./knowledge_base.json");
        knowledgeBase = await kbResponse.json();
        console.log("Knowledge base loaded.");

        // ** AI Model Loading - Placeholder **
        // In a real scenario with a TFLite model URL:
        // console.log("Loading model...");
        // model = await tflite.loadTFLiteModel(MODEL_URL);
        // console.log("Model loaded successfully.");
        // diagnoseButton.textContent = "Diagnose Plant";
        // diagnoseButton.disabled = false;

        // For now, since we don't have a readily available TFLite PlantVillage model URL for direct browser loading,
        // we will continue with the simulated inference to demonstrate the flow.
        // The user will be informed that the next step is to integrate a *real* model.
        console.warn("Using SIMULATED AI model inference. Real model integration is pending.");
        diagnoseButton.textContent = "Diagnose Plant (Simulated AI)";
        diagnoseButton.disabled = false;

    } catch (error) {
        console.error("Error loading resources:", error);
        if (Object.keys(knowledgeBase).length === 0) {
            resultDiv.innerHTML = "<p>Error: Could not load plant disease knowledge base. Please try again later.</p>";
        }
        diagnoseButton.textContent = "Error Loading - Try Refresh";
        diagnoseButton.disabled = true;
    }
}

loadModelAndKnowledgeBase();

imageUpload.addEventListener("change", function() {
    document.getElementById("resultsContainer").style.display = "none";
    alternativesDiv.innerHTML = "";
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            plantImage.src = e.target.result;
            plantImage.style.display = "block";
        }
        reader.readAsDataURL(file);
    } else {
        plantImage.style.display = "none";
    }
});

diagnoseButton.addEventListener("click", async function() {
    if (!imageUpload.files || imageUpload.files.length === 0) {
        alert("Please upload an image first.");
        return;
    }
    if (Object.keys(knowledgeBase).length === 0) {
        alert("Knowledge base is not loaded yet. Please wait or refresh.");
        return;
    }

    document.getElementById("resultsContainer").style.display = "block";
    plantNameSpan.textContent = "Processing...";
    diseaseNameSpan.textContent = "Processing...";
    confidenceSpan.textContent = "...";
    advicePre.textContent = "...";
    medicinePre.textContent = "...";
    alternativesDiv.innerHTML = "";

    // ** SIMULATED AI MODEL INFERENCE (as real model integration is pending a usable URL/setup) **
    // If `model` were loaded, the code would be:
    // const imageElement = document.getElementById('plantImage');
    // const tensor = tf.browser.fromPixels(imageElement)
    //     .resizeNearestNeighbor([224, 224]) // Resize to model's expected input size
    //     .toFloat()
    //     .expandDims(); // Add batch dimension
    // // Normalize if required by the model, e.g., .div(tf.scalar(255))
    // const predictions = await model.predict(tensor).data();
    // tensor.dispose();
    //
    // let maxProb = 0;
    // let predictedIndex = -1;
    // for (let i = 0; i < predictions.length; i++) {
    //     if (predictions[i] > maxProb) {
    //         maxProb = predictions[i];
    //         predictedIndex = i;
    //     }
    // }
    // const predictedClassKey = PLANT_VILLAGE_CLASSES[predictedIndex];
    // const confidenceValue = maxProb;

    // Using simulation for now:
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * PLANT_VILLAGE_CLASSES.length);
        const predictedClassKey = PLANT_VILLAGE_CLASSES[randomIndex];
        const confidenceValue = Math.random() * (0.99 - 0.65) + 0.65;

        const [plantNameStr, ...diseaseParts] = predictedClassKey.split("___");
        const diseaseNameStr = diseaseParts.join(" ").replace(/_/g, " ") || "Healthy";

        plantNameSpan.textContent = plantNameStr.replace(/_/g, " ");
        diseaseNameSpan.textContent = diseaseNameStr;
        confidenceSpan.textContent = (confidenceValue * 100).toFixed(2) + "%";

        const diagnosisData = knowledgeBase[predictedClassKey];
        if (diagnosisData) {
            advicePre.textContent = diagnosisData.advice || "No specific advice available.";
            medicinePre.textContent = diagnosisData.medicine || "No specific medicine information available.";
        } else {
            advicePre.textContent = "Detailed information not found for: " + predictedClassKey;
            medicinePre.textContent = "N/A";
        }

        if (confidenceValue < 0.75 && PLANT_VILLAGE_CLASSES.length > 2) {
            alternativesDiv.innerHTML = "<p><strong>Alternative Possibilities (Low Confidence):</strong></p><ul>";
            let count = 0;
            const shownAlternatives = new Set([randomIndex]);
            while(count < 2 && shownAlternatives.size < PLANT_VILLAGE_CLASSES.length) {
                let altIndex = Math.floor(Math.random() * PLANT_VILLAGE_CLASSES.length);
                if (!shownAlternatives.has(altIndex)) {
                    const altClassKey = PLANT_VILLAGE_CLASSES[altIndex];
                    const [altPlant, ...altDiseaseParts] = altClassKey.split("___");
                    const altDisease = altDiseaseParts.join(" ").replace(/_/g, " ") || "Healthy";
                    alternativesDiv.innerHTML += `<li>${altPlant.replace(/_/g, " ")} - ${altDisease}</li>`;
                    shownAlternatives.add(altIndex);
                    count++;
                }
            }
            alternativesDiv.innerHTML += "</ul>";
        }
    }, 1000);
});


