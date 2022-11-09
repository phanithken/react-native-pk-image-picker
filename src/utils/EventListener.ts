export interface EventListenerInstance {
  count: number;
  refs: Record<string, any>;
}

export class EventListener {
  static Instance: EventListenerInstance = {
    count: 0,
    refs: {},
  };

  static addEventListener(
    eventName: string,
    callback: (data: any) => void
  ): string {
    EventListener.Instance.count++;
    // TODO: check if eventName already registered
    const keys = Object.keys(EventListener.Instance.refs);
    for (let i = 0; i < keys.length; i++) {
      console.log(keys[i]);
    }
    const eventId = 'event_' + EventListener.Instance.count;
    EventListener.Instance.refs[eventId] = {
      name: eventName,
      callback,
    };
    return eventId;
  }

  static removeEventListener(id: string) {
    delete EventListener.Instance.refs[id];
  }

  static removeAllListeners() {
    Object.keys(EventListener.Instance.refs).forEach((_id) => {
      delete EventListener.Instance.refs[_id];
    });
  }

  static emitEvent(eventName: string, data: any) {
    Object.keys(EventListener.Instance.refs).forEach((_id) => {
      if (
        EventListener.Instance.refs[_id] &&
        EventListener.Instance.refs[_id].name === eventName
      ) {
        EventListener.Instance.refs[_id].callback(data);
      }
    });
  }
}
