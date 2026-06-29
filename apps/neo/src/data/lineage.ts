export const cypherQuery = `MATCH p =
(:Event {id:'INC-9902'})
-[:OBSERVES|MATCHES|RECOMMENDS*]->
(:Decision)
RETURN p LIMIT 1`

export const queryRows = [
  { start: 'Event:INC-9902', relation: 'OBSERVES', end: 'Fact:Traffic_Jam', source: 'ITS CSV', state: '채택' },
  { start: 'Event:INC-9902', relation: 'INVALIDATES', end: 'Fact:Radar_Object', source: 'Radar-102', state: '제외' },
  { start: 'Fact:Traffic_Jam', relation: 'MATCHES', end: 'Rule:Tunnel_Rear_Collision', source: 'Rule KB', state: '채택' },
  { start: 'Rule:Tunnel_Rear_Collision', relation: 'RECOMMENDS', end: 'Decision:VMS_Detour', source: 'Neo4j', state: '채택' },
]

export const nodeProps: Array<[string, string]> = [
  ['타입', 'Rule'],
  ['id', 'Tunnel_Rear_Collision'],
  ['조건', '터널 접근 + 정체 지속 + 우회 제한'],
  ['cf', '0.95'],
  ['소유', 'NEO Engine'],
]

export const queryMetrics: Array<[string, string]> = [
  ['노드', '5'],
  ['관계', '4'],
  ['응답', '38ms'],
  ['출처', 'external Neo4j'],
]

export const supportSet: Array<[string, string]> = [
  ['채택', 'ITS CSV, CCTV 저시정, 터널 위치'],
  ['제외', 'Radar 단독 낙하물 감지'],
  ['이유', '교차 검증 실패 입력은 판단 근거에서 제외'],
]

export const traceSteps: Array<[string, string]> = [
  ['Event', 'INC-9902'],
  ['Fact', '차량 정체'],
  ['Rule', '터널 접근 위험'],
  ['Decision', 'VMS 우회 유도'],
]
