export type LibClusterCommands = [
  {
    name: "resource-group-add";
    payload: {
      group_id: string;
      resource_id_list: string[];
      adjacent_resource_id?: string | null;
      put_after_adjacent?: boolean;
    };
  },
  {
    name: "resource-enable";
    payload: {
      resource_or_tag_ids: string[];
    };
  },
  {
    name: "resource-disable";
    payload: {
      resource_or_tag_ids: string[];
    };
  },
  {
    name: "resource-unmanage";
    payload: {
      resource_or_tag_ids: string[];
    };
  },
  {
    name: "resource-manage";
    payload: {
      resource_or_tag_ids: string[];
    };
  },
  {
    name: "resource-create";
    payload: {
      resource_id: string;
      resource_agent_name: string;
      operation_list: Record<string, string>[];
      meta_attributes: Record<string, string>;
      instance_attributes: Record<string, string>;
      allow_absent_agent?: boolean;
      allow_invalid_operation?: boolean;
      allow_invalid_instance_attributes?: boolean;
      use_default_operations?: boolean;
      ensure_disabled: boolean;
      allow_not_suitable_command?: boolean;

      wait?: boolean;
    };
  },
  {
    name: "node-standby-unstandby";
    payload: {
      standby: boolean;
      node_names: string[];
    };
  },
  {
    name: "node-maintenance-unmaintenance";
    payload: {
      maintenance: boolean;
      node_names: string[];
    };
  },
  {
    name: "cluster-add-nodes";
    payload: {
      nodes: {
        name: string;
        addrs?: string[];
        devices?: string[];
        watchdog?: string;
      }[];
      start?: boolean;
      enable?: boolean;
      no_watchdog_validation?: boolean;
      force_flags?: string[];
      wait?: boolean;
    };
  },
  {
    name: "cluster-remove-nodes";
    payload: {
      node_list: string[];
      force_flags?: string[];
    };
  },
];
