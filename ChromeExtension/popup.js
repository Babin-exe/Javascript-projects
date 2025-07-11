// document.addEventListener("DOMContentLoaded", () => {
//     const butt = document.querySelector(".changeColorBtn");
//     const colorGrid = document.querySelector(".colorGrid");
//     const colorValue = document.querySelector(".colorValue");
  
//     butt.addEventListener("click", async () => {
//       chrome.storage.sync.get("color", ({ color }) => {
//         console.log("Stored color:", color);
//       });
  
//       let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//       chrome.scripting.executeScript(
//         {
//           target: { tabId: tab.id },
//           function: pickColor,
//         },
//         async (injectionResults) => {
//           const [data] = injectionResults;
//           if (data.result) {
//             const color = data.result.sRGBHex;
//             colorGrid.style.backgroundColor = color;
//             colorValue.innerHTML = color;
//             try {
//               await navigator.clipboard.writeText(color);
//             } catch (error) {
//               console.error(error);
//             }
//           }
//           console.log(injectionResults);
//         }
//       );
//     });
//   });
  
//   async function pickColor() {
//     try {
//       const eyeDropper = new EyeDropper();
//       return await eyeDropper.open();
//     } catch (error) {
//       console.log(error);
//     }
//   }
const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {
    chrome.storage.sync.get('color', ({ color }) => {
        console.log('color: ', color);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: pickColor,
        },
        async (injectionResults) => {
            const [data] = injectionResults;
            if (data.result) {
                const color = data.result.sRGBHex;
                colorGrid.style.backgroundColor = color;
                colorValue.innerText = color;
                try {
                    await navigator.clipboard.writeText(color);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    );
});

async function pickColor() {
    try {
        // Picker
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (err) {
        console.error(err);
    }
}