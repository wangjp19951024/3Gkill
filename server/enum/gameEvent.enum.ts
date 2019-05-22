/**
 * gameEvent
 * 游戏内所有的事件
 */

 import Card from '../card';
import Game from '../game';

 enum GameEvent {
     /**游戏开始 */
    GameBegin,

    /**回合开始 */
    RoundBegin,

    /**在两个阶段之间 */
    BeforePhaseBegin,

    /**玩牌阶段开始 */

    PhaseBegin,

    /**玩牌阶段结束 */
    PhaseEnd,

    /**回合结束 */
    RoundEnd,

    /**回合结束后 */
    AfterRoundEnd,

    /**需要使用卡牌时 */
    NeedUseCard,

    /**需要打出卡牌时 */
    NeedRespondCard,

    /**使用卡牌 */
    UseCard,

    /**需要选定目标 */
    SetTarget,

    /**成为目标 */
    BecomeTarget,

    /**指定目标后 */
    AfterTarget,

    /**成为目标后 */
    AfterBecomeTarget,

    /**使用的卡牌动作生效前 */
    BeforeCallCard,

    /**设定无效目标 */
    setInvalidTarget,

    /**卡牌生效前 */
    BeforeCardEffect,

    /**卡牌被抵消 */
    CardCounteracted,

    /**卡牌生效 */
    CardEffect,

    /**使用结算结束时 */
    UseCardEnd,

    /**使用结算结束时 */
    AfterUseCardEnd,

    /**造成伤害动作前 */
    BeforeDamageCall,

    /**伤害结算开始前 */
    BeforeDamageBegin,

    /**伤害结算开始 */
    DamageBegin,

    /**造成伤害 */
    Damage,

    /**收到伤害 */
    Damaged,

    /**造成伤害后 */
    AfterDamage,

    /**收到伤害后 */
    AfterDamaged,

    /**伤害结算结束 */
    DamageEnd,

    /**失去体力时 */
    LoseHP,

    /**失去体力后 */
    AfterLoseHP,

    /**体力扣减前 */
    BeforeReduceHP,

    /**体力恢复前 */
    BeforeRecover,

    /**体力恢复后 */
    AfterRecover,

    /**进入濒死状态 */
    GetDying,

    /**濒死状态 */
    Dying,

    /**濒死结算结束后 */
    AfterDying,

    /**死亡结算开始前 */
    BeforeDie,

    /**确认信息前（有无人可救） */
    BeforeConfirmInfo,

    /**确认信息后 */
    AfterConfirmInfo,

    /**死亡时 */
    Die,

    /**杀死角色之后的奖惩 阵营机制*/
    RewardMurder,

    /**死亡后 */
    AfterDie,

    /**使用技能动作之前 */
    BeforeUseSkillCall,

    /**卡牌移至目标区域前 */
    BeforeCardMoveArea,

    /**卡牌移至目标区域后 */
    AfterCardMoveArea,

    /**计算摸牌阶段的摸牌数 */
    calcDrawCardCount

 }

 enum GameSyncSKill {
    /**是否有该技能 */
    hasSkill, 

    /**计算距离 */
    calcDistance,

    /**是否限制使用次数 */
    LimitUseCount,

    /**是否限制距离 */
    LimitUseDistance,

    /**计算额外目标上限 */
    CalcExtraMaxTargetCount,

    /**无视防具 */
    IgnoreArmor,

    /**防具无效 */
    ArmorValid,

    /**是否能够响应牌（之前的某一张牌）如南蛮入侵之类的范围技 */
    CanAnswerCard,

    /**计算恢复体力的数值 */
    CalcRecoverNumber
 }

 /**判断是否可以因某些事件 而停止游戏*/
 const GameEventCanStop = (event: GameEvent, ret: any) : boolean => {
     switch (event) {
        case GameEvent.BeforeCardEffect:
            return typeof ret != 'undefined' && (!ret || ret && ret.effect === false && ret.CardCounteracted instanceof Card );
        case GameEvent.Dying:
        case GameEvent.NeedUseCard:
        case GameEvent.NeedRespondCard:
        case GameEvent.CardCounteracted:
        case GameEvent.BeforeDamageBegin:
            return ret;
        case GameEvent.Damage:
        case GameEvent.Damaged:
            return true;
        default:
            return false;
     }
 }

 /**同步操作事件判断 */
 const SyncGameEventCanStop = (event : GameSyncSKill, ret : any) : boolean => {
    switch (event) {
        case GameSyncSKill.hasSkill:
        case GameSyncSKill.IgnoreArmor:
            return !! ret;
        case GameSyncSKill.LimitUseCount:
        case GameSyncSKill.LimitUseDistance:
        case GameSyncSKill.ArmorValid:
        case GameSyncSKill.CanAnswerCard:
            return !ret;
        default :
            return false;
    }
 }

 export { GameEvent, GameSyncSKill, GameEventCanStop, SyncGameEventCanStop };