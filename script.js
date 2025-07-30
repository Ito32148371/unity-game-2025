// ゲームデータ配列
const games = [
    {
        id: "neko",
        title: "ネコジャンプ",
        author: "Aさん",
        description: "ネコがジャンプしてコインを集めるゲームです。高得点を目指して頑張りましょう！",
        howToPlay: "スペースキーでジャンプ、左右キーで移動",
        thumbnail: "images/neko_thumb.png",
        folder: "games/neko"
    },
    {
        id: "space",
        title: "スペースシューター",
        author: "Bさん",
        description: "宇宙船を操作して敵を倒すシューティングゲームです。",
        howToPlay: "矢印キーで移動、スペースキーで攻撃",
        thumbnail: "images/space_thumb.png",
        folder: "games/space"
    },
    {
        id: "puzzle",
        title: "パズルマスター",
        author: "Cさん",
        description: "ブロックを組み合わせてラインを消すパズルゲームです。",
        howToPlay: "マウスクリックでブロックを操作",
        thumbnail: "images/puzzle_thumb.png",
        folder: "games/puzzle"
    },
    {
        id: "racing",
        title: "スピードレーサー",
        author: "Dさん",
        description: "車を運転してコースを駆け抜けるレーシングゲームです。",
        howToPlay: "WASDキーまたは矢印キーで操作",
        thumbnail: "images/racing_thumb.png",
        folder: "games/racing"
    },
    {
        id: "flappycat",
        title: "FlappyCat",
        author: "Dさん",
        description: "空を飛ぶゲームです",
        howToPlay: "Spaceキーで操作",
        thumbnail: "images/racing_thumb.png",
        folder: "games/FlappyCat"
    },
    {
        id: "escapecolorblock",
        title: "EscapeColorBlock",
        author: "Dさん",
        description: "空を飛ぶゲームです",
        howToPlay: "Spaceキーで操作",
        thumbnail: "images/racing_thumb.png",
        folder: "games/EscapeColorBlock"
    }
];

// いいね機能の管理
class LikeManager {
    constructor() {
        this.STORAGE_KEY = 'minigame_likes';
        this.USER_LIKES_KEY = 'minigame_user_likes';
    }

    // いいね数を取得
    getLikes(gameId) {
        const likes = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        return likes[gameId] || 0;
    }

    // いいね数を設定
    setLikes(gameId, count) {
        const likes = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        likes[gameId] = count;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(likes));
    }

    // ユーザーがいいねしたかチェック
    hasUserLiked(gameId) {
        const userLikes = JSON.parse(localStorage.getItem(this.USER_LIKES_KEY) || '[]');
        return userLikes.includes(gameId);
    }

    // いいねを追加
    addLike(gameId) {
        if (this.hasUserLiked(gameId)) {
            return false; // 既にいいね済み
        }

        // いいね数を増加
        const currentLikes = this.getLikes(gameId);
        this.setLikes(gameId, currentLikes + 1);

        // ユーザーのいいね履歴に追加
        const userLikes = JSON.parse(localStorage.getItem(this.USER_LIKES_KEY) || '[]');
        userLikes.push(gameId);
        localStorage.setItem(this.USER_LIKES_KEY, JSON.stringify(userLikes));

        return true;
    }
}

// ゲーム管理クラス
class GameManager {
    constructor() {
        this.likeManager = new LikeManager();
        this.currentGameId = null;
        this.isRandomMode = false;
    }

    // ゲームIDから詳細を取得
    getGameById(id) {
        return games.find(game => game.id === id);
    }

    // ランダムなゲームを取得
    getRandomGame(excludeId = null) {
        let availableGames = games;
        if (excludeId) {
            availableGames = games.filter(game => game.id !== excludeId);
        }
        const randomIndex = Math.floor(Math.random() * availableGames.length);
        return availableGames[randomIndex];
    }

    // 次のゲームを取得（順番）
    getNextGame(currentId) {
        const currentIndex = games.findIndex(game => game.id === currentId);
        const nextIndex = (currentIndex + 1) % games.length;
        return games[nextIndex];
    }

    // URLパラメータを解析
    parseUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        this.currentGameId = urlParams.get('id');
        this.isRandomMode = urlParams.get('mode') === 'random';
    }

    // ゲームページに遷移
    navigateToGame(gameId, isRandom = false) {
        const url = `game.html?id=${gameId}${isRandom ? '&mode=random' : ''}`;
        window.location.href = url;
    }

    // いいねボタンのHTMLを生成
    generateLikeButton(gameId, showCount = true) {
        const likes = this.likeManager.getLikes(gameId);
        const isLiked = this.likeManager.hasUserLiked(gameId);
        const likedClass = isLiked ? 'liked' : '';
        
        return `
            <button class="like-btn ${likedClass}" onclick="handleLike('${gameId}')">
                <i class="heart-icon">♥</i>
                ${showCount ? `<span class="like-count">${likes}</span>` : ''}
            </button>
        `;
    }
}

// グローバルインスタンス
const gameManager = new GameManager();

// いいねボタンクリック処理
function handleLike(gameId) {
    const success = gameManager.likeManager.addLike(gameId);
    if (success) {
        // UIを更新
        updateLikeButtons(gameId);
        
        // アニメーション効果
        const likeBtn = document.querySelector(`[onclick="handleLike('${gameId}')"]`);
        if (likeBtn) {
            likeBtn.classList.add('like-animation');
            setTimeout(() => {
                likeBtn.classList.remove('like-animation');
            }, 600);
        }
    }
}

// いいねボタンのUIを更新
function updateLikeButtons(gameId) {
    const likes = gameManager.likeManager.getLikes(gameId);
    const isLiked = gameManager.likeManager.hasUserLiked(gameId);
    
    document.querySelectorAll(`[onclick="handleLike('${gameId}')"]`).forEach(btn => {
        const countSpan = btn.querySelector('.like-count');
        if (countSpan) {
            countSpan.textContent = likes;
        }
        
        if (isLiked) {
            btn.classList.add('liked');
        }
    });
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 初期設定に必要ないいね数を設定（デモ用）
    if (!localStorage.getItem('minigame_likes')) {
        const initialLikes = {
            'neko': 15,
            'space': 8,
            'puzzle': 12,
            'racing': 6
        };
        localStorage.setItem('minigame_likes', JSON.stringify(initialLikes));
    }
});

// フェードアニメーション
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = performance.now();
    
    function animate(currentTime) {
        let elapsed = currentTime - start;
        let progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.opacity = progress;
            requestAnimationFrame(animate);
        } else {
            element.style.opacity = '1';
        }
    }
    
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    let start = performance.now();
    let startOpacity = parseFloat(element.style.opacity) || 1;
    
    function animate(currentTime) {
        let elapsed = currentTime - start;
        let progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.opacity = startOpacity * (1 - progress);
            requestAnimationFrame(animate);
        } else {
            element.style.opacity = '0';
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}