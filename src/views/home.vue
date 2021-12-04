<template>
  <div class="pre-ui-el" id="pre-ui-el">
    <!-- Loading screen -->
    <div class="pre-ui-el__loading" id="ui-loading-screen">
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.loadingBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="imgs-row">
          <div class="ui-img-wrapper">
            <img src="../assets/img/common/game-logo.png" class="game-title" />
          </div>

          <div class="ui-img-wrapper">
            <img src="../assets/img/common/kicd-logo.png" class="kicd-logo" />
          </div>
        </div>

        <div class="loading-text"><span>Loading...</span></div>
      </div>
    </div>

    <!-- Start Screen -->
    <div class="pre-ui-el__start ui-hidden" id="ui-start-screen">
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.startBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="imgs-row">
          <div class="ui-img-wrapper">
            <img src="../assets/img/common/game-logo.png" class="game-title" />
          </div>
        </div>

        <div class="cta-action">
          <button
            class="ul-el-btn"
            type="button"
            @click="showGameUIScreen('STORY_SCREEN')"
          >
            &nbsp;
          </button>
        </div>
      </div>

      <div class="ui-el-characters">
        <img src="../assets/img/start/characters.png" alt="" />
      </div>
    </div>

    <!-- Story Mode -->
    <div class="pre-ui-el__story ui-hidden" id="ui-story-screen">
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.storyBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="empty-space">&nbsp;</div>

        <div class="cta-action">
          <button class="ul-el-btn" id="ui-start-story-btn">&nbsp;</button>
        </div>
      </div>

      <div class="character-block left-character-block">
        <span>
          <img
            src="../assets/img/story/chats/3-elder.png"
            alt=""
            class="speech-bubbles"
            id="bubble-elder"
          />
          <img src="../assets/img/story/characters/elder-smile.png" alt="" />
        </span>
      </div>
      <div class="character-block right-character-block">
        <span>
          <img
            src="../assets/img/story/chats/1-david.png"
            alt=""
            class="speech-bubbles"
            id="bubble-david"
          />
          <img
            src="../assets/img/story/chats/2-kezia.png"
            alt=""
            class="speech-bubbles"
            id="bubble-kezia"
          />
          <img src="../assets/img/story/characters/char-happy.png" alt="" />
        </span>
      </div>
    </div>

    <!-- Game set up -->
    <div class="pre-ui-el__setup ui-hidden" id="ui-setup-screen">
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.greenBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="board-container">
          <div class="board">
            <img src="../assets/img/setup/board.png" class="board-bg" />
            <img
              src="../assets/img/setup/board-title.png"
              class="board-title"
            />
            <div class="ui-text">
              <p>Work together to <span>clean the river</span></p>
              <p>Take turns playing at each <span>station</span></p>
              <p><span>Play together</span> on one device</p>
            </div>

            <div class="cta-action">
              <button
                class="ul-el-btn"
                type="button"
                @click="showGameUIScreen('TAKE_POSITION_SCREEN')"
              >
                &nbsp;
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="ui-navigation">
        <button
          type="button"
          @click="showGameUIScreen('STORY_SCREEN')"
          class="navigation-btn navigation-back"
        >
          <img src="../assets/img/common/navigation-back.png" alt="" />
        </button>
        <button
          type="button"
          @click="showGameUIScreen('STORY_SCREEN')"
          class="navigation-btn navigation-close"
        >
          <img src="../assets/img/common/navigation-close.png" alt="" />
        </button>
      </div>
    </div>

    <!-- Take Position -->
    <div
      class="pre-ui-el__take-position ui-hidden"
      id="ui-take-position-screen"
    >
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.takePositionBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="ui-position-block ui-top">
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-1">
                <img
                  src="../assets/img/common/btn-bg.png"
                  alt=""
                  class="ui-b-default"
                />
                <img
                  src="../assets/img/common/btn-bg-selected.png"
                  alt=""
                  class="ui-b-selected"
                />
              </button>
              <img
                src="../assets/img/take-position/label-lab.png"
                alt=""
                class="ui-label"
              />
            </div>
            <div class="ui-chat-bubble">
              <img src="../assets/img/take-position/chat-top.png" alt="" />
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-1">
                <img
                  src="../assets/img/common/btn-bg.png"
                  alt=""
                  class="ui-b-default"
                />
                <img
                  src="../assets/img/common/btn-bg-selected.png"
                  alt=""
                  class="ui-b-selected"
                />
              </button>
              <img
                src="../assets/img/take-position/label-form.png"
                alt=""
                class="ui-label"
              />
            </div>
          </div>
          <div class="title-row ui-fliped">
            <h1>TAKE YOUR POSITION!</h1>
          </div>
        </div>
        <div class="ui-position-block ui-bottom">
          <div class="title-row">
            <h1>TAKE YOUR POSITION!</h1>
          </div>
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <img
                src="../assets/img/take-position/label-excavator.png"
                alt=""
                class="ui-label"
              />
              <button class="ui-take-pos-btn ui-take-pos-btn-1">
                <img
                  src="../assets/img/common/btn-bg.png"
                  alt=""
                  class="ui-b-default"
                />
                <img
                  src="../assets/img/common/btn-bg-selected.png"
                  alt=""
                  class="ui-b-selected"
                />
              </button>
            </div>
            <div class="ui-chat-bubble">
              <img src="../assets/img/take-position/chat-bottom.png" alt="" />
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <img
                src="../assets/img/take-position/label-factory.png"
                alt=""
                class="ui-label"
              />
              <button class="ui-take-pos-btn ui-take-pos-btn-1">
                <img
                  src="../assets/img/common/btn-bg.png"
                  alt=""
                  class="ui-b-default"
                />
                <img
                  src="../assets/img/common/btn-bg-selected.png"
                  alt=""
                  class="ui-b-selected"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chattime  -->
    <div
      class="pre-ui-el__take-position pre-ui-el__chat-time ui-hidden"
      id="ui-chat-time-screen"
    >
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.chatTimeBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="ui-position-block ui-top">
          <div class="btn-row">
            <div class="ui-chat-bubble">
              <img src="../assets/img/take-position/chat-top.png" alt="" />
            </div>
          </div>
        </div>
        <div class="ui-middle">
          <img src="../assets/img/chat-time/chat-time.png" class="_text" />
          <div class="ui-timer">
            <span class="ui-timer-label" data-duration="10">10:00</span>
          </div>
          <img
            src="../assets/img/chat-time/chat-time-flipped.png"
            class="_text"
          />
        </div>
        <div class="ui-position-block ui-bottom">
          <div class="btn-row">
            <div class="ui-chat-bubble">
              <img src="../assets/img/take-position/chat-bottom.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- How to play -->
    <div
      class="pre-ui-el__take-position pre-ui-el__how-to-play ui-hidden"
      id="how-to-play-screen"
    >
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.chatTimeBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="ui-position-block ui-top">
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <img src="../assets/img/how-to-play/board-top.png" class="__bg" />
              <div class="ui-btn-wrapper top-left">
                <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-2">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
              <div class="ui-text-wrapper">
                <p class="ui-fliped">
                  Pebbles will enter the screen from one side. Match 2 pebbles
                  of the same color in a row to get a point. Control the pebbles
                  by tapping the green arrows on the screen. Pebbles can be
                  matched horizontally or vertically.
                </p>
              </div>
              <div class="ui-label-wrapper">
                <img
                  src="../assets/img/take-position/label-lab.png"
                  alt=""
                  class="ui-label"
                />
              </div>
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <img src="../assets/img/how-to-play/board-top.png" class="__bg" />
              <div class="ui-btn-wrapper top-right">
                <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-2">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
              <div class="ui-text-wrapper">
                <p class="ui-fliped">
                  boat shall arrive from the factory and will display an icon.
                  Slide the icon into the “Organic” or “Inorganic” bubble. Make
                  sure you slide the icon into the correct bubble
                  (Organic/Inorganic) in order to gain a point.
                </p>
              </div>
              <div class="ui-label-wrapper">
                <img
                  src="../assets/img/take-position/label-form.png"
                  alt=""
                  class="ui-label"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="ui-position-block ui-bottom">
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <img
                src="../assets/img/how-to-play/board-bottom.png"
                class="__bg"
              />
              <div class="ui-label-wrapper">
                <img
                  src="../assets/img/take-position/label-excavator.png"
                  alt=""
                  class="ui-label"
                />
              </div>
              <div class="ui-text-wrapper">
                <p>
                  Answer a math question once the forklifts arrive from the
                  digger. Make sure not to get the incorrect answer or take too
                  long, or else the forklifts will get stuck in the traffic,
                  creating a queue to get into the factory.
                </p>
              </div>
              <div class="ui-btn-wrapper bottom-left">
                <button class="ui-take-pos-btn ui-take-pos-btn-2">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <img
                src="../assets/img/how-to-play/board-bottom.png"
                class="__bg"
              />
              <div class="ui-label-wrapper">
                <img
                  src="../assets/img/take-position/label-factory.png"
                  alt=""
                  class="ui-label"
                />
              </div>
              <div class="ui-text-wrapper">
                <p>
                  Tap the digger on the screen to grab objects floating down the
                  river. Make sure you tap the screen at the right time in order
                  to capture the rubbish flowing down. If you tap at the wrong
                  time, you will collect nothing.
                </p>
              </div>
              <div class="ui-btn-wrapper bottom-right">
                <button class="ui-take-pos-btn ui-take-pos-btn-2">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Round Summary -->
    <div
      class="
          pre-ui-el__take-position
          pre-ui-el__how-to-play
          pre-ui-el__round_summary
          ui-hidden
        "
      id="round-summary-screen"
    >
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.gameBgNoFilterBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="scores-container">
          <div class="scores-row _top">
            <div class="_col col-left">
              <div class="chat-bubble-container tl ui-fliped">
                <span class="chat-label">Chat</span>
                <div class="chat-bubble-wrapper">
                  <div class="_txt">
                    <span class="_big">99</span> <span>Sample analysis</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="_col col-right">
              <div class="chat-bubble-container tr ui-fliped">
                <span class="chat-label">Chat</span>
                <div class="chat-bubble-wrapper">
                  <div class="_txt">
                    <span class="_big">99</span> <span>Waste produced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="scores-row _middle">
            <div class="__col">
              <div class="group-score-board">
                <img
                  class="_title"
                  src="../assets/img/round-summary/group-score.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
            <div class="__col">
              <div class="group-score-board ui-fliped">
                <img
                  class="_title"
                  src="../assets/img/round-summary/group-score.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="scores-row _bottom">
            <div class="_col col-left">
              <div class="chat-bubble-container bl">
                <span class="chat-label">Chat</span>
                <div class="chat-bubble-wrapper">
                  <div class="_txt">
                    <span class="_big">99</span> <span>Pieces Collected</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="_col col-right">
              <div class="chat-bubble-container br">
                <span class="chat-label">Chat</span>
                <div class="chat-bubble-wrapper">
                  <div class="_txt">
                    <span class="_big">99</span> <span>Bundles Recycled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ui-position-block ui-top">
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <div class="ui-btn-wrapper top-left">
                <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-4">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
              <div class="ui-label-wrapper">
                <img
                  src="../assets/img/take-position/label-lab.png"
                  alt=""
                  class="ui-label"
                />
              </div>
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <div class="ui-btn-wrapper top-right">
                <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-4">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
              <div class="ui-label-wrapper">
                <img
                  src="../assets/img/take-position/label-form.png"
                  alt=""
                  class="ui-label"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="ui-position-block ui-bottom">
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <div class="ui-label-wrapper">
                <img
                  src="../assets/img/take-position/label-excavator.png"
                  alt=""
                  class="ui-label"
                />
              </div>
              <div class="ui-btn-wrapper bottom-left">
                <button class="ui-take-pos-btn ui-take-pos-btn-4">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <div class="ui-label-wrapper">
                <img
                  src="../assets/img/take-position/label-factory.png"
                  alt=""
                  class="ui-label"
                />
              </div>
              <div class="ui-btn-wrapper bottom-right">
                <button class="ui-take-pos-btn ui-take-pos-btn-4">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Position -->
    <div
      class="pre-ui-el__take-position ui-hidden"
      id="ui-change-position-screen"
    >
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.changePositionBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="ui-position-block ui-top">
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-3">
                <img
                  src="../assets/img/common/btn-bg.png"
                  alt=""
                  class="ui-b-default"
                />
                <img
                  src="../assets/img/common/btn-bg-selected.png"
                  alt=""
                  class="ui-b-selected"
                />
              </button>
              <img
                src="../assets/img/take-position/label-lab.png"
                alt=""
                class="ui-label"
              />
            </div>
            <div class="ui-chat-bubble">
              <img src="../assets/img/take-position/chat-top.png" alt="" />
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-3">
                <img
                  src="../assets/img/common/btn-bg.png"
                  alt=""
                  class="ui-b-default"
                />
                <img
                  src="../assets/img/common/btn-bg-selected.png"
                  alt=""
                  class="ui-b-selected"
                />
              </button>
              <img
                src="../assets/img/take-position/label-form.png"
                alt=""
                class="ui-label"
              />
            </div>
          </div>
          <div class="title-row ui-fliped">
            <img src="../assets/img/change-position/move-to-the-right.png" />
          </div>
        </div>
        <div class="ui-position-block ui-bottom">
          <div class="title-row">
            <img src="../assets/img/change-position/move-to-the-right.png" />
          </div>
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <img
                src="../assets/img/take-position/label-excavator.png"
                alt=""
                class="ui-label"
              />
              <button class="ui-take-pos-btn ui-take-pos-btn-3">
                <img
                  src="../assets/img/common/btn-bg.png"
                  alt=""
                  class="ui-b-default"
                />
                <img
                  src="../assets/img/common/btn-bg-selected.png"
                  alt=""
                  class="ui-b-selected"
                />
              </button>
            </div>
            <div class="ui-chat-bubble">
              <img src="../assets/img/take-position/chat-bottom.png" alt="" />
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <img
                src="../assets/img/take-position/label-factory.png"
                alt=""
                class="ui-label"
              />
              <button class="ui-take-pos-btn ui-take-pos-btn-3">
                <img
                  src="../assets/img/common/btn-bg.png"
                  alt=""
                  class="ui-b-default"
                />
                <img
                  src="../assets/img/common/btn-bg-selected.png"
                  alt=""
                  class="ui-b-selected"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Game Summary -->
    <div
      class="
          pre-ui-el__take-position
          pre-ui-el__how-to-play
          pre-ui-el__round_summary
          pre-ui-el__game_summary
          ui-hidden
        "
      id="game-summary-screen"
    >
      <div
        class="ui-bg"
        :style="{ 'background-image': `url('${bg.gameBgNoFilterBg}')` }"
      ></div>

      <div class="ui-content">
        <div class="scores-container">
          <div class="scores-row">
            <div class="__col">
              <div class="group-score-board ui-fliped">
                <img
                  class="_title"
                  src="../assets/img/game-complete/round-1.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
            <div class="__col">
              <div class="group-score-board ui-fliped">
                <img
                  class="_title"
                  src="../assets/img/game-complete/round-2.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
            <div class="__col">
              <div class="group-score-board ui-fliped">
                <img
                  class="_title"
                  src="../assets/img/game-complete/round-3.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
            <div class="__col">
              <div class="group-score-board ui-fliped">
                <img
                  class="_title"
                  src="../assets/img/game-complete/round-4.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="scores-row _middle">
            <img src="../assets/img/game-complete/game-complete.png" />

            <img
              src="../assets/img/game-complete/game-complete.png"
              class="ui-flipped"
            />
          </div>

          <div class="scores-row">
            <div class="__col">
              <div class="group-score-board">
                <img
                  class="_title"
                  src="../assets/img/game-complete/round-1.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
            <div class="__col">
              <div class="group-score-board">
                <img
                  class="_title"
                  src="../assets/img/game-complete/round-2.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
            <div class="__col">
              <div class="group-score-board">
                <img
                  class="_title"
                  src="../assets/img/game-complete/round-3.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
            <div class="__col">
              <div class="group-score-board">
                <img
                  class="_title"
                  src="../assets/img/game-complete/round-4.png"
                />
                <div class="_scores">
                  <span>99</span>
                </div>
                <div class="_stars">
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/unlocked-star.png"
                    class="star"
                  />
                  <img
                    src="../assets/img/round-summary/locked-star.png"
                    class="star"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ui-position-block ui-top">
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <div class="ui-btn-wrapper top-left">
                <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-5">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <div class="ui-btn-wrapper top-right">
                <button class="ui-take-pos-btn ui-fliped ui-take-pos-btn-5">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="ui-position-block ui-bottom">
          <div class="btn-row">
            <div class="ui-take-pos-btn-wrapper">
              <div class="ui-btn-wrapper bottom-left">
                <button class="ui-take-pos-btn ui-take-pos-btn-5">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
            </div>
            <div class="ui-take-pos-btn-wrapper">
              <div class="ui-btn-wrapper bottom-right">
                <button class="ui-take-pos-btn ui-take-pos-btn-5">
                  <img
                    src="../assets/img/common/btn-bg.png"
                    alt=""
                    class="ui-b-default"
                  />
                  <img
                    src="../assets/img/common/btn-bg-selected.png"
                    alt=""
                    class="ui-b-selected"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Game Canvas -->
    <div class="ui-hidden" id="game-canvas">
      <HelloWorld :jina="name_" />
    </div>

    <!-- Device rotation indicator -->
    <div class="device-rotation-indicator" id="rotate-device-indicator-screen">
      <div id="phone_c">
        <div class="phone"></div>
        <div class="message">Rotate Device</div>
      </div>
    </div>
  </div>
</template>

<script>
// import PaperImg from "../assets/img/paper.png";
import thudogg from "../assets/media/thud.ogg";
import thudmp3 from "../assets/media/thud.mp3";
import HelloWorld from "../components/HelloWorld.vue";
import loadingBg from "../assets/img/loading/loading-bg.png";
import storyBg from "../assets/img/story/story-bg.png";
import takePositionBg from "../assets/img/take-position/take-position-bg.png";
import startBg from "../assets/img/start/start-bg.png";
import greenBg from "../assets/img/common/green-bg.png";
import gameBgNoFilterBg from "../assets/img/common/game-bg-no-filter.png";
import changePositionBg from "../assets/img/change-position/change-position-bg.png";
import chatTimeBg from "../assets/img/chat-time/chat-time-bg.png";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      myName: "Chris",
      name_: "Creaw",
      audio: {
        thudmp3,
        thudogg,
      },
      bg: {
        loadingBg,
        storyBg,
        takePositionBg,
        startBg,
        greenBg,
        gameBgNoFilterBg,
        changePositionBg,
        chatTimeBg,
      },
      roomId: null,
      showGameIdForm: false,
      PRE_UI_EL: "",
      LOADING_SCREEN: "",
      START_SCREEN: "",
      STORY_SCREEN: "",
      SETUP_SCREEN: "",
      TAKE_POSITION_SCREEN: "",
      CHAT_TIME_SCREEN: "",
      HOW_TO_PLAY_SCREEN: "",
      GAME_PLAY_SCREEN: "",
      ROUND_SUMMARY_SCREEN: "",
      CHANGE_POSITION_SCREEN: "",
      GAME_SUMMARY_SCREEN: "",
      SHOW_ROTATE_DEVICE_INDICATOR_SCREEN: "",
      SELECTION_DELAY: 800,
      uiStoryModeTracker: 0,
      uiStartStoryBtn: "",
      uiTimeInterval: null,
      uiChats: [
        "../assets/img/story/chats/1-david.png",
        "../assets/img/story/chats/2-kezia.png",
        "../assets/img/story/chats/3-elder.png",
        "../assets/img/story/chats/4-elder.png",
        "../assets/img/story/chats/5-elder.png",
        "../assets/img/story/chats/6-elder.png",
        "../assets/img/story/chats/7-elder.png",
      ],
    };
  },
  computed: {
    ...mapGetters("game", [
      "getPlayerGameMode",
      "getHasJoinGameError",
      "getPlayerTurnText",
      "getGameOver",
    ]),
  },
  components: {
    HelloWorld,
  },
  created() {},
  mounted() {
    this.setUpUI();

    this.initialSetUp();

    //loading timer
    setTimeout(() => {
      this.showGameUIScreen("GAME_PLAY_SCREEN");
    }, 4000);
  },
  methods: {
    ...mapActions("game", [
      "pauseGame",
      "resumeGame",
      "resetState",
      "restartGame",
    ]),
    setUpUI() {
      this.PRE_UI_EL = document.getElementById("pre-ui-el");
      this.LOADING_SCREEN = document.getElementById("ui-loading-screen");
      this.START_SCREEN = document.getElementById("ui-start-screen");
      this.STORY_SCREEN = document.getElementById("ui-story-screen");
      this.SETUP_SCREEN = document.getElementById("ui-setup-screen");
      this.TAKE_POSITION_SCREEN = document.getElementById(
        "ui-take-position-screen"
      );
      this.CHAT_TIME_SCREEN = document.getElementById("ui-chat-time-screen");
      this.HOW_TO_PLAY_SCREEN = document.getElementById("how-to-play-screen");
      this.GAME_PLAY_SCREEN = document.getElementById("game-canvas");
      this.ROUND_SUMMARY_SCREEN = document.getElementById(
        "round-summary-screen"
      );
      this.CHANGE_POSITION_SCREEN = document.getElementById(
        "ui-change-position-screen"
      );
      this.GAME_SUMMARY_SCREEN = document.getElementById("game-summary-screen");
      this.SHOW_ROTATE_DEVICE_INDICATOR_SCREEN = document.getElementById(
        "rotate-device-indicator-screen"
      );
    },
    showGameUIScreen(screen, cb) {
      // let's hide all the screens
      this.hideAllGameUIScreens();

      if (screen == "LOADING_SCREEN") {
        this.LOADING_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "START_SCREEN") {
        this.START_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "STORY_SCREEN") {
        this.STORY_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "SETUP_SCREEN") {
        this.SETUP_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "TAKE_POSITION_SCREEN") {
        this.TAKE_POSITION_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "CHAT_TIME_SCREEN") {
        this.CHAT_TIME_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "HOW_TO_PLAY_SCREEN") {
        this.HOW_TO_PLAY_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "GAME_PLAY_SCREEN") {
        this.GAME_PLAY_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "ROUND_SUMMARY_SCREEN") {
        //show show Pre Post Game UI
        this.showPrePostGameUI();
        this.ROUND_SUMMARY_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "CHANGE_POSITION_SCREEN") {
        this.CHANGE_POSITION_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "GAME_SUMMARY_SCREEN") {
        this.GAME_SUMMARY_SCREEN.classList.remove("ui-hidden");
      } else if (screen == "SHOW_ROTATE_DEVICE_INDICATOR_SCREEN") {
        this.SHOW_ROTATE_DEVICE_INDICATOR_SCREEN.classList.remove("ui-hidden");
      } else {
        //Do nothing
      }

      //call the callback if it exists
      if (cb) {
        cb();
      }
    },
    showPrePostGameUI(cb) {
      this.PRE_UI_EL.classList.remove("ui-hidden");
      if (cb) {
        cb();
      }
    },
    hidePrePostGameUI(cb) {
      this.PRE_UI_EL.classList.add("ui-hidden");
      if (cb) {
        cb();
      }
    },
    startChatTimer(cb) {
      let chatTimer = document.querySelector(".ui-timer-label");
      let chatTimerDuration = chatTimer.getAttribute("data-duration");
      // set the default time
      chatTimer.innerHTML = `${chatTimerDuration}:00`;

      let chatTimerInterval = setInterval(() => {
        chatTimerDuration--;
        chatTimer.innerHTML = `${chatTimerDuration}:00`;
        if (chatTimerDuration <= 0) {
          clearInterval(chatTimerInterval);
          cb();
          return;
        }
      }, 1000);
    },
    hideAllGameUIScreens() {
      this.LOADING_SCREEN.classList.add("ui-hidden");
      this.START_SCREEN.classList.add("ui-hidden");
      this.STORY_SCREEN.classList.add("ui-hidden");
      this.SETUP_SCREEN.classList.add("ui-hidden");
      this.TAKE_POSITION_SCREEN.classList.add("ui-hidden");
      this.CHAT_TIME_SCREEN.classList.add("ui-hidden");
      this.HOW_TO_PLAY_SCREEN.classList.add("ui-hidden");
      this.GAME_PLAY_SCREEN.classList.add("ui-hidden");
      this.ROUND_SUMMARY_SCREEN.classList.add("ui-hidden");
      this.CHANGE_POSITION_SCREEN.classList.add("ui-hidden");
      this.GAME_SUMMARY_SCREEN.classList.add("ui-hidden");
      this.SHOW_ROTATE_DEVICE_INDICATOR_SCREEN.classList.add("ui-hidden");
    },
    initialSetUp() {
      // use this to keep track of the story mode
      this.uiStoryModeTracker = 0;

      //a timer variable so that we can clear the timer after story mode is over
      let uiTimerDuration = 600;

      //event listener for button with id "ui-start-story-btn"
      this.uiStartStoryBtn = document.getElementById("ui-start-story-btn");
      this.uiStartStoryBtn.addEventListener("click", () => {
        if (this.uiStoryModeTracker > 0) {
          this.showGameUIScreen("SETUP_SCREEN");
          //reset story
          this.uiStoryModeTracker = 0;
          clearInterval(this.uiTimeInterval);

          return;
        }

        this.uiStartStoryBtn.style.opacity = "0";

        let davidEl = document.getElementById("bubble-david");
        davidEl.style.display = "block";
        davidEl.setAttribute("src", this.uiChats[0]);
        this.uiStoryModeTracker++;

        this.uiTimeInterval = setInterval(this.uiShowStory, uiTimerDuration);
      });

      let takePositionBtns = document.getElementsByClassName(
        "ui-take-pos-btn-1"
      );
      let howToPlayBtns = document.getElementsByClassName("ui-take-pos-btn-2");
      let changePositionBtns = document.getElementsByClassName(
        "ui-take-pos-btn-3"
      );
      let roundSummaryBtns = document.getElementsByClassName(
        "ui-take-pos-btn-4"
      );
      let gameSummaryBtns = document.getElementsByClassName(
        "ui-take-pos-btn-5"
      );

      //event listener for all take position buttons
      for (let i = 0; i < takePositionBtns.length; i++) {
        let btn = takePositionBtns[i];
        btn.addEventListener("click", (e) => {
          if (e.target.classList.contains("ui-take-pos-btn-1")) {
            //is it's self
            if (e.target.classList.contains("is-selected")) {
              e.target.classList.remove("is-selected");
            } else {
              e.target.classList.add("is-selected");
            }
          } else {
            if (e.target.parentNode.classList.contains("is-selected")) {
              e.target.parentNode.classList.remove("is-selected");
            } else {
              e.target.parentNode.classList.add("is-selected");
            }
          }
          this.uiCheckPositionsStageOne();
        });
      }

      //event listener for all take position buttons
      for (let i = 0; i < howToPlayBtns.length; i++) {
        let btn = howToPlayBtns[i];
        btn.addEventListener("click", (e) => {
          if (e.target.classList.contains("ui-take-pos-btn-2")) {
            //is it's self
            if (e.target.classList.contains("is-selected")) {
              e.target.classList.remove("is-selected");
            } else {
              e.target.classList.add("is-selected");
            }
          } else {
            if (e.target.parentNode.classList.contains("is-selected")) {
              e.target.parentNode.classList.remove("is-selected");
            } else {
              e.target.parentNode.classList.add("is-selected");
            }
          }
          this.uiCheckPositionsHowToPlay();
        });
      }

      //event listener for all change position buttons
      for (let i = 0; i < changePositionBtns.length; i++) {
        let btn = changePositionBtns[i];
        btn.addEventListener("click", (e) => {
          if (e.target.classList.contains("ui-take-pos-btn-3")) {
            //is it's self
            if (e.target.classList.contains("is-selected")) {
              e.target.classList.remove("is-selected");
            } else {
              e.target.classList.add("is-selected");
            }
          } else {
            if (e.target.parentNode.classList.contains("is-selected")) {
              e.target.parentNode.classList.remove("is-selected");
            } else {
              e.target.parentNode.classList.add("is-selected");
            }
          }
          this.uiCheckChangePositions();
        });
      }

      //event listener for all round summary buttons
      for (let i = 0; i < roundSummaryBtns.length; i++) {
        let btn = roundSummaryBtns[i];
        btn.addEventListener("click", (e) => {
          if (e.target.classList.contains("ui-take-pos-btn-4")) {
            //is it's self
            if (e.target.classList.contains("is-selected")) {
              e.target.classList.remove("is-selected");
            } else {
              e.target.classList.add("is-selected");
            }
          } else {
            if (e.target.parentNode.classList.contains("is-selected")) {
              e.target.parentNode.classList.remove("is-selected");
            } else {
              e.target.parentNode.classList.add("is-selected");
            }
          }
          this.uiCheckRoundSummaryBtns();
        });
      }

      //event listener for game over buttons
      for (let i = 0; i < gameSummaryBtns.length; i++) {
        let btn = gameSummaryBtns[i];
        btn.addEventListener("click", (e) => {
          if (e.target.classList.contains("ui-take-pos-btn-5")) {
            //is it's self
            if (e.target.classList.contains("is-selected")) {
              e.target.classList.remove("is-selected");
            } else {
              e.target.classList.add("is-selected");
            }
          } else {
            if (e.target.parentNode.classList.contains("is-selected")) {
              e.target.parentNode.classList.remove("is-selected");
            } else {
              e.target.parentNode.classList.add("is-selected");
            }
          }
          this.uiCheckGameOverClicks();
        });
      }
    },

    uiShowStory() {
      let elderEl = document.getElementById("bubble-elder");
      let davidEl = document.getElementById("bubble-david");
      let keziahEl = document.getElementById("bubble-kezia");

      switch (this.uiStoryModeTracker) {
        case 0:
          davidEl.style.display = "block";
          davidEl.setAttribute("src", this.uiChats[0]);
          this.uiStoryModeTracker++;
          break;
        case 1:
          keziahEl.style.display = "block";
          keziahEl.setAttribute("src", this.uiChats[1]);
          this.uiStoryModeTracker++;
          break;
        case 2:
          davidEl.style.display = "none";
          keziahEl.style.display = "none";
          elderEl.style.display = "block";
          elderEl.setAttribute("src", this.uiChats[2]);
          this.uiStoryModeTracker++;
          break;
        case 3:
          elderEl.setAttribute("src", this.uiChats[3]);
          //increment story mode tracker
          this.uiStoryModeTracker++;
          break;
        case 4:
          elderEl.setAttribute("src", this.uiChats[4]);
          //increment story mode tracker
          this.uiStoryModeTracker++;
          break;
        case 5:
          elderEl.setAttribute("src", this.uiChats[5]);
          //increment story mode tracker
          this.uiStoryModeTracker++;
          break;
        case 6:
          elderEl.setAttribute("src", this.uiChats[6]);
          //increment story mode tracker
          this.uiStoryModeTracker++;
          break;
        default:
          elderEl.style.display = "none";
          this.uiStartStoryBtn.style.opacity = "1";
          clearInterval(this.uiTimeInterval);
          break;
      }
    },

    //check if all the positions are taken
    uiCheckPositionsStageOne() {
      let positions = document.getElementsByClassName("ui-take-pos-btn-1");
      let takenPositions = document.getElementsByClassName("is-selected");
      if (positions.length === takenPositions.length) {
        setTimeout(() => {
          this.showGameUIScreen("CHAT_TIME_SCREEN", () => {
            this.startChatTimer(() => {
              this.showGameUIScreen("HOW_TO_PLAY_SCREEN");
            });
          });
        }, this.SELECTION_DELAY);

        //reset selections
        for (let i = 0; i < positions.length; i++) {
          let element = positions[i];
          setTimeout(() => {
            element.classList.remove("is-selected");
          }, this.SELECTION_DELAY + 200);
        }
        return true;
      }
      return false;
    },

    //check if all the positions are taken
    uiCheckPositionsHowToPlay() {
      let positions = document.getElementsByClassName("ui-take-pos-btn-2");
      let takenPositions = document.querySelectorAll(
        ".ui-take-pos-btn-2.is-selected"
      );
      console.log(takenPositions.length);
      if (positions.length === takenPositions.length) {
        // TODO: Call hidePrePostGameUI();
        setTimeout(() => {
          this.showGameUIScreen("GAME_PLAY_SCREEN");
        }, this.SELECTION_DELAY);

        //reset selections
        for (let i = 0; i < positions.length; i++) {
          let element = positions[i];
          setTimeout(() => {
            element.classList.remove("is-selected");
          }, this.SELECTION_DELAY + 200);
        }
        return true;
      }
      return false;
    },

    //check if all players changed positions
    uiCheckChangePositions() {
      let positions = document.getElementsByClassName("ui-take-pos-btn-3");
      let takenPositions = document.querySelectorAll(
        ".ui-take-pos-btn-3.is-selected"
      );
      if (positions.length === takenPositions.length) {
        //TODO: Show Game summary
        setTimeout(() => {
          this.showGameUIScreen("GAME_SUMMARY_SCREEN");
        }, this.SELECTION_DELAY);

        //reset selections
        for (let i = 0; i < positions.length; i++) {
          let element = positions[i];
          setTimeout(() => {
            element.classList.remove("is-selected");
          }, this.SELECTION_DELAY + 200);
        }
        return true;
      }
      return false;
    },

    //check if all round summary buttons have been selected
    uiCheckRoundSummaryBtns() {
      let positions = document.getElementsByClassName("ui-take-pos-btn-4");
      let takenPositions = document.querySelectorAll(
        ".ui-take-pos-btn-4.is-selected"
      );
      if (positions.length === takenPositions.length) {
        //simulate delay

        setTimeout(() => {
          this.showGameUIScreen("CHAT_TIME_SCREEN", () => {
            this.startChatTimer(() => {
              this.showGameUIScreen("CHANGE_POSITION_SCREEN");
            });
          });
        }, this.SELECTION_DELAY);

        //reset selections
        for (let i = 0; i < positions.length; i++) {
          let element = positions[i];
          setTimeout(() => {
            element.classList.remove("is-selected");
          }, this.SELECTION_DELAY + 200);
        }
        return true;
      }
      return false;
    },

    //check if all players have clicked after game ends
    uiCheckGameOverClicks() {
      let positions = document.getElementsByClassName("ui-take-pos-btn-5");
      let takenPositions = document.querySelectorAll(
        ".ui-take-pos-btn-5.is-selected"
      );
      if (positions.length === takenPositions.length) {
        //TODO: Show Game summary
        setTimeout(() => {
          this.showGameUIScreen("START_SCREEN");
        }, this.SELECTION_DELAY);

        //reset selections
        for (let i = 0; i < positions.length; i++) {
          let element = positions[i];
          setTimeout(() => {
            element.classList.remove("is-selected");
          }, this.SELECTION_DELAY + 200);
        }
        return true;
      }
      return false;
    },
    showIntialScreen() {
      return this.getPlayerGameMode === null ||
        this.getHasJoinGameError === true
        ? true
        : false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
