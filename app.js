(function () {
  const copyBtn = document.getElementById("copy-contact");
  const status = document.getElementById("copy-status");
  const mailto = document.getElementById("mailto-cta");

  function setStatus(msg) {
    if (status) status.textContent = msg;
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async function () {
      const text = copyBtn.getAttribute("data-contact") || "";
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setStatus("已複製預約說明到剪貼簿（仍須你手動寄出，本頁不會自動對外寄信）。");
      } catch (err) {
        setStatus("無法自動複製。請手動使用 Email：ytchien870704@gmail.com");
      }
    });
  }

  if (mailto) {
    mailto.addEventListener("click", function () {
      setStatus("已開啟本機郵件程式草稿（若有）。請確認收件人與內容後再決定是否送出；本站不會代為寄出。");
    });
  }
})();
