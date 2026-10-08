declare module "node-cron" {
  interface ScheduledTask {
    start(): void;
    stop(): void;
    destroy(): void;
  }
  interface ScheduleOptions {
    scheduled?: boolean;
    timezone?: string;
    name?: string;
    runOnInit?: boolean;
    noOverlap?: boolean;
  }
  export function schedule(
    expression: string,
    func: () => void | Promise<void>,
    options?: ScheduleOptions
  ): ScheduledTask;
  export function validate(expression: string): boolean;
  const cron: {
    schedule: typeof schedule;
    validate: typeof validate;
  };
  export default cron;
}