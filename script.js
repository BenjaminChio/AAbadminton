// 全局變量
let currentTab = 'basic';
let currentCalculatorMode = 'basic';
let translations = {
    'zh': {
        'main-title': '羽毛球活動AA計費器',
        'basic-tab': '基本計算',
        'advanced-tab': '進階計算',
        'court-fee-label': '場地費 (元):',
        'shuttle-fee-label': '球費 (元):',
        'total-people-label': '總人數:',
        'female-count-label': '女生人數:',
        'discount-amount-label': '減免金額 (元/人):',
        'basic-calculate-btn': '計算AA費用',
        'basic-reset-btn': '一鍵重置',
        'advanced-calculate-btn': '計算AA費用',
        'advanced-reset-btn': '一鍵重置',
        'calculate-shuttle-btn': '計算球費',
        'adv-calculate-shuttle-btn': '計算球費',
        'shuttle-calc-title': '球費計算',
        'tube-price-label': '每筒球價格 (元):',
        'shuttles-used-label': '使用球數量:',
        'calculate-shuttle-fee-btn': '計算',
        'apply-shuttle-fee-btn': '應用',
        'export-btn': '匯出Excel',
        'share-btn': '分享',
        'per-person-cost': '每人費用: ',
        'male-cost': '男生每人費用: ',
        'female-cost': '女生每人費用: ',
        'single-shuttle-price': '每個球均價: ',
        'total-shuttle-cost': '總球費: ',
        'yuan': '元',
        'calculation-details': '計算明細',
        'court-fee': '場地費',
        'shuttle-fee': '球費',
        'total-people': '總人數',
        'female-people': '女生人數',
        'discount-per-female': '女生減免金額/人',
        'calculation-result': '計算結果',
        'share-title': '羽毛球AA計費結果',
        'share-text': '我們今天打羽毛球的AA費用計算結果',
        'copy-success': '已複製到剪貼簿',
        'copy-fail': '複製失敗，請手動複製',
        'no-share-api': '您的瀏覽器不支持分享功能，已複製結果到剪貼簿',
        'date-label': '日期: '        
    },
    'en': {
        'main-title': 'Badminton Activity AA Calculator',
        'basic-tab': 'Basic Calculation',
        'advanced-tab': 'Advanced Calculation',
        'court-fee-label': 'Court Fee ($):',
        'shuttle-fee-label': 'Shuttle Fee ($):',
        'total-people-label': 'Total People:',
        'female-count-label': 'Female Count:',
        'discount-amount-label': 'Discount Amount ($/person):',
        'basic-calculate-btn': 'Calculate AA Cost',
        'basic-reset-btn': 'Reset All',
        'advanced-calculate-btn': 'Calculate AA Cost',
        'advanced-reset-btn': 'Reset All',
        'calculate-shuttle-btn': 'Calculate Shuttle Cost',
        'adv-calculate-shuttle-btn': 'Calculate Shuttle Cost',
        'shuttle-calc-title': 'Shuttle Fee Calculator',
        'tube-price-label': 'Price per Tube ($):',
        'shuttles-used-label': 'Shuttles Used:',
        'calculate-shuttle-fee-btn': 'Calculate',
        'apply-shuttle-fee-btn': 'Apply',
        'export-btn': 'Export',
        'share-btn': 'Share',
        'per-person-cost': 'Cost per person: ',
        'male-cost': 'Cost per male: ',
        'female-cost': 'Cost per female: ',
        'single-shuttle-price': 'Price per shuttle: ',
        'total-shuttle-cost': 'Total shuttle cost: ',
        'yuan': '',
        'calculation-details': 'Calculation Details',
        'court-fee': 'Court Fee',
        'shuttle-fee': 'Shuttle Fee',
        'total-people': 'Total People',
        'female-people': 'Female Count',
        'discount-per-female': 'Discount per Female',
        'calculation-result': 'Calculation Result',
        'share-title': 'Badminton Activity AA Calculator Result',
        'share-text': 'Here is our badminton activity AA calculation result',
        'copy-success': 'Copied to clipboard',
        'copy-fail': 'Copy failed, please copy manually',
        'no-share-api': 'Your browser does not support sharing, result copied to clipboard',
        'date-label': 'Date: '
    }
};

// 初始化頁面
document.addEventListener('DOMContentLoaded', function() {
    // 設置默認值
    document.getElementById('total-people').value = 1;
    document.getElementById('adv-total-people').value = 1;
    document.getElementById('female-count').value = 0;
    document.getElementById('discount-amount').value = 0;
    
    // 檢查本地存儲中的語言設置
    const savedLanguage = localStorage.getItem('badmintonCalcLanguage');
    if (savedLanguage) {
        document.getElementById('language-select').value = savedLanguage;
        changeLanguage();
    }
    
    // 顯示當前日期
    displayCurrentDate();
});

// 切換標籤頁
function showTab(tabName) {
    // 隱藏所有標籤頁內容
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // 移除所有標籤按鈕的活動狀態
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // 顯示選定的標籤頁內容並激活按鈕
    document.getElementById(tabName).classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
    
    currentTab = tabName;
}

// 顯示球費計算器
function showShuttleCalculator(mode = 'basic') {
    currentCalculatorMode = mode;
    document.getElementById('shuttle-calculator').style.display = 'block';
    
    // 清空之前的結果
    document.getElementById('shuttle-result').innerHTML = '';
    document.getElementById('tube-price').value = '';
    document.getElementById('shuttles-used').value = '';
}

// 關閉球費計算器
function closeShuttleCalculator() {
    document.getElementById('shuttle-calculator').style.display = 'none';
}

// 計算球費
function calculateShuttleFee() {
    const tubePrice = parseFloat(document.getElementById('tube-price').value) || 0;
    const shuttlesUsed = parseInt(document.getElementById('shuttles-used').value) || 0;
    
    // 每筒12個球，計算單個球的價格
    const singleShuttlePrice = tubePrice / 12;
    
    // 計算總球費
    const totalShuttleFee = singleShuttlePrice * shuttlesUsed;
    
    // 顯示結果
    document.getElementById('shuttle-result').innerHTML = 
        `${translations['zh']['single-shuttle-price']} ${singleShuttlePrice.toFixed(2)} ${translations['zh']['yuan']}<br>
         ${translations['zh']['total-shuttle-cost']} ${totalShuttleFee.toFixed(2)} ${translations['zh']['yuan']}`;
}

// 應用球費計算結果
function applyShuttleFee() {
    const tubePrice = parseFloat(document.getElementById('tube-price').value) || 0;
    const shuttlesUsed = parseInt(document.getElementById('shuttles-used').value) || 0;
    
    // 每筒12個球，計算單個球的價格
    const singleShuttlePrice = tubePrice / 12;
    
    // 計算總球費
    const totalShuttleFee = singleShuttlePrice * shuttlesUsed;
    
    // 根據當前模式更新相應的輸入框
    if (currentCalculatorMode === 'basic') {
        document.getElementById('shuttle-fee').value = totalShuttleFee.toFixed(2);
    } else {
        document.getElementById('adv-shuttle-fee').value = totalShuttleFee.toFixed(2);
    }
    
    // 關閉彈窗
    closeShuttleCalculator();
    
    // 如果在基本計算模式下，自動計算AA費用
    if (currentCalculatorMode === 'basic' && document.getElementById('court-fee').value && document.getElementById('total-people').value) {
        calculateBasic();
    } else if (currentCalculatorMode === 'advanced' && document.getElementById('adv-court-fee').value && document.getElementById('adv-total-people').value) {
        calculateAdvanced();
    }
}

// 基本計算
function calculateBasic() {
    const courtFee = parseFloat(document.getElementById('court-fee').value) || 0;
    const shuttleFee = parseFloat(document.getElementById('shuttle-fee').value) || 0;
    const totalPeople = parseInt(document.getElementById('total-people').value) || 1;
    
    // 計算總費用
    const totalFee = courtFee + shuttleFee;
    
    // 計算每人費用
    const perPersonFee = totalFee / totalPeople;
    
    // 顯示結果
    document.getElementById('basic-result').innerHTML = 
        `${translations['zh']['per-person-cost']} ${perPersonFee.toFixed(2)} ${translations['zh']['yuan']}`;
}

// 進階計算
function calculateAdvanced() {
    const courtFee = parseFloat(document.getElementById('adv-court-fee').value) || 0;
    const shuttleFee = parseFloat(document.getElementById('adv-shuttle-fee').value) || 0;
    const totalPeople = parseInt(document.getElementById('adv-total-people').value) || 1;
    const femaleCount = parseInt(document.getElementById('female-count').value) || 0;
    const discountAmount = parseFloat(document.getElementById('discount-amount').value) || 0;
    
    // 計算總費用
    const totalFee = courtFee + shuttleFee;
    
    // 計算男生人數
    const maleCount = totalPeople - femaleCount;
    
    // 確保男生人數不為負數
    if (maleCount < 0) {
        alert('女生人數不能大於總人數！');
        return;
    }
    
    // 計算女生減免的總金額
    const totalDiscount = femaleCount * discountAmount;
    
    // 計算男生和女生的費用
    let maleFee, femaleFee;
    
    if (totalPeople > 0) {
        // 基本每人費用
        const baseFee = totalFee / totalPeople;
        
        // 女生費用 = 基本費用 - 減免金額
        femaleFee = baseFee - discountAmount;
        
        // 男生費用 = 基本費用 + (女生減免總金額 / 男生人數)
        if (maleCount > 0) {
            maleFee = baseFee + (totalDiscount / maleCount);
        } else {
            maleFee = 0; // 如果沒有男生
        }
    } else {
        maleFee = 0;
        femaleFee = 0;
    }
    
    // 顯示結果
    let resultHTML = '';
    
    if (maleCount > 0) {
        resultHTML += `${translations['zh']['male-cost']} ${maleFee.toFixed(2)} ${translations['zh']['yuan']}<br>`;
    }
    
    if (femaleCount > 0) {
        resultHTML += `${translations['zh']['female-cost']} ${femaleFee.toFixed(2)} ${translations['zh']['yuan']}`;
    }
    
    document.getElementById('advanced-result').innerHTML = resultHTML;
}

// 重置基本計算器
function resetBasic() {
    document.getElementById('court-fee').value = '';
    document.getElementById('shuttle-fee').value = '';
    document.getElementById('total-people').value = 1;
    document.getElementById('basic-result').innerHTML = '';
}

// 重置進階計算器
function resetAdvanced() {
    document.getElementById('adv-court-fee').value = '';
    document.getElementById('adv-shuttle-fee').value = '';
    document.getElementById('adv-total-people').value = 1;
    document.getElementById('female-count').value = 0;
    document.getElementById('discount-amount').value = 0;
    document.getElementById('advanced-result').innerHTML = '';
}

// 語言切換功能已移除

// 顯示當前日期
function displayCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    
    const dateString = `${translations['zh']['date-label']} ${year}-${month}-${day}`;
    
    // 更新兩個界面的日期顯示
    document.getElementById('basic-date-display').textContent = dateString;
    document.getElementById('advanced-date-display').textContent = dateString;
    document.getElementById('date-display').textContent = dateString;
}

// 匯出到Excel
function exportToExcel() {
    // 準備數據
    let data = [];
    const today = new Date();
    const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    
    // 標題行
    data.push([translations['zh']['calculation-details']]);
    data.push([translations['zh']['date-label'], dateString]);
    data.push([]);
    
    // 檢查是否有球費計算的詳細信息
    const tubePrice = parseFloat(document.getElementById('tube-price').value) || 0;
    const shuttlesUsed = parseInt(document.getElementById('shuttles-used').value) || 0;
    
    if (tubePrice > 0 && shuttlesUsed > 0) {
        const singleShuttlePrice = tubePrice / 12;
        const totalShuttleFee = singleShuttlePrice * shuttlesUsed;
        
        data.push([translations['zh']['tube-price-label'].replace(':', ''), tubePrice.toFixed(2)]);
        data.push([translations['zh']['shuttles-used-label'].replace(':', ''), shuttlesUsed]);
        data.push([translations['zh']['single-shuttle-price'].replace(':', ''), singleShuttlePrice.toFixed(2)]);
        data.push([translations['zh']['total-shuttle-cost'].replace(':', ''), totalShuttleFee.toFixed(2)]);
        data.push([]);
    }
    
    if (currentTab === 'basic') {
        // 基本計算數據
        const courtFee = parseFloat(document.getElementById('court-fee').value) || 0;
        const shuttleFee = parseFloat(document.getElementById('shuttle-fee').value) || 0;
        const totalPeople = parseInt(document.getElementById('total-people').value) || 1;
        const totalFee = courtFee + shuttleFee;
        const perPersonFee = totalFee / totalPeople;
        
        data.push([translations['zh']['court-fee'], courtFee.toFixed(2)]);
        data.push([translations['zh']['shuttle-fee'], shuttleFee.toFixed(2)]);
        data.push([translations['zh']['total-people'], totalPeople]);
        data.push([]);
        data.push([translations['zh']['calculation-result']]);
        data.push([translations['zh']['per-person-cost'], perPersonFee.toFixed(2)]);
    } else {
        // 進階計算數據
        const courtFee = parseFloat(document.getElementById('adv-court-fee').value) || 0;
        const shuttleFee = parseFloat(document.getElementById('adv-shuttle-fee').value) || 0;
        const totalPeople = parseInt(document.getElementById('adv-total-people').value) || 1;
        const femaleCount = parseInt(document.getElementById('female-count').value) || 0;
        const discountAmount = parseFloat(document.getElementById('discount-amount').value) || 0;
        const maleCount = totalPeople - femaleCount;
        const totalFee = courtFee + shuttleFee;
        const totalDiscount = femaleCount * discountAmount;
        
        // 計算男生和女生的費用
        let maleFee = 0, femaleFee = 0;
        
        if (totalPeople > 0) {
            const baseFee = totalFee / totalPeople;
            femaleFee = baseFee - discountAmount;
            
            if (maleCount > 0) {
                maleFee = baseFee + (totalDiscount / maleCount);
            }
        }
        
        data.push([translations['zh']['court-fee'], courtFee.toFixed(2)]);
        data.push([translations['zh']['shuttle-fee'], shuttleFee.toFixed(2)]);
        data.push([translations['zh']['total-people'], totalPeople]);
        data.push([translations['zh']['female-people'], femaleCount]);
        data.push([translations['zh']['discount-per-female'], discountAmount.toFixed(2)]);
        data.push([]);
        data.push([translations['zh']['calculation-result']]);
        
        if (maleCount > 0) {
            data.push([translations['zh']['male-cost'], maleFee.toFixed(2)]);
        }
        
        if (femaleCount > 0) {
            data.push([translations['zh']['female-cost'], femaleFee.toFixed(2)]);
        }
    }
    
    // 創建工作表
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // 創建工作簿
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Badminton AA');
    
    // 生成Excel文件並下載
    XLSX.writeFile(wb, `badminton_aa_calculation_${dateString}.xlsx`);
}

// 分享結果
function shareResults() {
    let shareText = '';
    const lang = document.getElementById('language-select').value;
    const today = new Date();
    const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    
    if (currentTab === 'basic') {
        // 基本計算數據
        const courtFee = parseFloat(document.getElementById('court-fee').value) || 0;
        const shuttleFee = parseFloat(document.getElementById('shuttle-fee').value) || 0;
        const totalPeople = parseInt(document.getElementById('total-people').value) || 1;
        const totalFee = courtFee + shuttleFee;
        const perPersonFee = totalFee / totalPeople;
        
        shareText = `${translations[lang]['calculation-details']}:\n` +
                   `${translations[lang]['date-label']} ${dateString}\n` +
                   `${translations[lang]['court-fee']}: ${courtFee.toFixed(2)}\n` +
                   `${translations[lang]['shuttle-fee']}: ${shuttleFee.toFixed(2)}\n` +
                   `${translations[lang]['total-people']}: ${totalPeople}\n\n` +
                   `${translations[lang]['calculation-result']}:\n` +
                   `${translations[lang]['per-person-cost']} ${perPersonFee.toFixed(2)} ${translations[lang]['yuan']}`;
    } else {
        // 進階計算數據
        const courtFee = parseFloat(document.getElementById('adv-court-fee').value) || 0;
        const shuttleFee = parseFloat(document.getElementById('adv-shuttle-fee').value) || 0;
        const totalPeople = parseInt(document.getElementById('adv-total-people').value) || 1;
        const femaleCount = parseInt(document.getElementById('female-count').value) || 0;
        const discountAmount = parseFloat(document.getElementById('discount-amount').value) || 0;
        const maleCount = totalPeople - femaleCount;
        const totalFee = courtFee + shuttleFee;
        const totalDiscount = femaleCount * discountAmount;
        
        // 計算男生和女生的費用
        let maleFee = 0, femaleFee = 0;
        
        if (totalPeople > 0) {
            const baseFee = totalFee / totalPeople;
            femaleFee = baseFee - discountAmount;
            
            if (maleCount > 0) {
                maleFee = baseFee + (totalDiscount / maleCount);
            }
        }
        
        shareText = `${translations[lang]['calculation-details']}:\n` +
                   `${translations[lang]['date-label']} ${dateString}\n` +
                   `${translations[lang]['court-fee']}: ${courtFee.toFixed(2)}\n` +
                   `${translations[lang]['shuttle-fee']}: ${shuttleFee.toFixed(2)}\n` +
                   `${translations[lang]['total-people']}: ${totalPeople}\n` +
                   `${translations[lang]['female-people']}: ${femaleCount}\n` +
                   `${translations[lang]['discount-per-female']}: ${discountAmount.toFixed(2)}\n\n` +
                   `${translations[lang]['calculation-result']}:\n`;
        
        if (maleCount > 0) {
            shareText += `${translations[lang]['male-cost']} ${maleFee.toFixed(2)} ${translations[lang]['yuan']}\n`;
        }
        
        if (femaleCount > 0) {
            shareText += `${translations[lang]['female-cost']} ${femaleFee.toFixed(2)} ${translations[lang]['yuan']}`;
        }
    }
    
    // 嘗試使用Web Share API
    if (navigator.share) {
        navigator.share({
            title: translations[lang]['share-title'],
            text: shareText
        }).catch(err => {
            console.error('Share failed:', err);
            copyToClipboard(shareText);
        });
    } else {
        // 如果不支持分享API，則複製到剪貼簿
        copyToClipboard(shareText);
        alert(translations[lang]['no-share-api']);
    }
}

// 複製到剪貼簿
function copyToClipboard(text) {
    const lang = document.getElementById('language-select').value;
    
    // 創建臨時文本區域
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        // 嘗試複製
        const successful = document.execCommand('copy');
        if (successful) {
            alert(translations[lang]['copy-success']);
        } else {
            alert(translations[lang]['copy-fail']);
        }
    } catch (err) {
        console.error('Copy failed:', err);
        alert(translations[lang]['copy-fail']);
    }
    
    // 移除臨時文本區域
    document.body.removeChild(textArea);
}